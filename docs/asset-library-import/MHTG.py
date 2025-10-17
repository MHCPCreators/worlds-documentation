"""
A graphical application to automate the creation of packed texture maps for various 
material types of Meta Horizon Worlds using a drag-and-drop interface.
"""
import tkinter as tk
from tkinter import filedialog, messagebox, ttk
from PIL import Image
import os
import shutil
from functools import partial

try:
    from tkinterdnd2 import DND_FILES, TkinterDnD
except ImportError:
    print("Error: The 'tkinterdnd2' library is required.")
    print("Please install it by running: pip install tkinterdnd2")
    exit(1)

# --- Material Definitions ---
# Defines the required input maps, output files, and Blender naming for each material type.
MATERIAL_CONFIG = {
    "Standard Image": {
        "inputs": ["Base Color (RGB)", "Roughness (A)"],
        "outputs": ["_BR"],
        "blender_suffix": ""
    },
    "Metal Image": {
        "inputs": ["Base Color (RGB)", "Roughness (A)", "Metallic (R)", "Emission (G)", "Occlusion (B)"],
        "outputs": ["_BR", "_MEO"],
        "blender_suffix": ""
    },
    "Unlit Image": {
        "inputs": ["Base Color (RGB)"],
        "outputs": ["_B"],
        "blender_suffix": "_Unlit"
    },
    "Unlit Blend Image": {
        "inputs": ["Base Color (RGB)", "Alpha (A)"],
        "outputs": ["_BA"],
        "blender_suffix": "_Blend"
    },
    "Transparent Image": {
        "inputs": ["Base Color (RGB)", "Roughness (A)", "Metallic (R)", "Emission (G)", "Smoothness (B)", "Alpha (A)"],
        "outputs": ["_BR", "_MESA"],
        "blender_suffix": "_Transparent"
    },
    "Masked Image": {
        "inputs": ["Base Color (RGB)", "Alpha (A)"],
        "outputs": ["_BA"],
        "blender_suffix": "_Masked"
    },
    "UIO Image (Animated)": {
        "inputs": ["Base Color (RGB)", "Alpha (A)"],
        "outputs": ["_BA"],
        "blender_suffix": "_UIO"
    }
}

# --- Core Image Processing Logic ---

def process_and_save(image, output_path):
    """Saves the image and returns a success/fail message."""
    try:
        image.save(output_path, 'PNG')
        return True, f"Saved: {os.path.basename(output_path)}"
    except Exception as e:
        return False, f"Error saving {os.path.basename(output_path)}:\n{e}"

def generate_br(base_color_path, roughness_path):
    """Generates an RGBA image from Base Color (RGB) and Roughness (A)."""
    base_color = Image.open(base_color_path).convert('RGB')
    roughness = Image.open(roughness_path).convert('L')
    if base_color.size != roughness.size:
        raise ValueError("Base Color and Roughness dimensions do not match.")
    base_color.putalpha(roughness)
    return base_color

def generate_ba(base_color_path, alpha_path):
    """Generates an RGBA image from Base Color (RGB) and Alpha (A)."""
    base_color = Image.open(base_color_path).convert('RGB')
    alpha = Image.open(alpha_path).convert('L')
    if base_color.size != alpha.size:
        raise ValueError("Base Color and Alpha dimensions do not match.")
    base_color.putalpha(alpha)
    return base_color
    
def generate_meo(metallic_path, emission_path, occlusion_path):
    """Generates an RGB image from Metallic (R), Emission (G), and Occlusion (B)."""
    metallic = Image.open(metallic_path).convert('L')
    emission = Image.open(emission_path).convert('L')
    occlusion = Image.open(occlusion_path).convert('L')
    if not (metallic.size == emission.size == occlusion.size):
        raise ValueError("MEO map dimensions do not match.")
    return Image.merge('RGB', (metallic, emission, occlusion))

def generate_mesa(metallic_path, emission_path, smoothness_path, alpha_path):
    """Generates an RGBA image from MESA channels."""
    metallic = Image.open(metallic_path).convert('L')
    emission = Image.open(emission_path).convert('L')
    smoothness = Image.open(smoothness_path).convert('L')
    alpha = Image.open(alpha_path).convert('L')
    if not (metallic.size == emission.size == smoothness.size == alpha.size):
        raise ValueError("MESA map dimensions do not match.")
    rgb_map = Image.merge('RGB', (metallic, emission, smoothness))
    rgb_map.putalpha(alpha)
    return rgb_map

# --- Main Application GUI ---

class App(TkinterDnD.Tk):
    """Main application window class."""
    def __init__(self):
        super().__init__()
        self.title("Meta Horizon Texture Generator (MHTG)")
        self.geometry("700x600")
        self.config(bg="#2e2e2e")
        self.minsize(600, 450)

        self.file_paths = {}
        self.drop_zone_widgets = {}

        # --- UI Setup ---
        self._setup_styles()
        self._setup_widgets()

    def _setup_styles(self):
        """Configure ttk styles for the application."""
        style = ttk.Style(self)
        style.theme_use('clam')
        style.configure('TFrame', background='#2e2e2e')
        style.configure('TLabel', background='#2e2e2e', foreground='#cccccc', font=('Helvetica', 10))
        style.configure('Caution.TLabel', foreground='#ffcc00', font=('Helvetica', 10, 'bold'))
        style.configure('TButton', background='#5a5a5a', foreground='white', font=('Helvetica', 10, 'bold'), borderwidth=0)
        style.map('TButton', background=[('active', '#6c6c6c')])
        style.configure('TMenubutton', background='#3c3c3c', foreground='white', font=('Helvetica', 10), borderwidth=1, arrowcolor='white')

    def _setup_widgets(self):
        """Create and arrange all the widgets in the window."""
        # --- Top control frame ---
        control_frame = ttk.Frame(self, padding="20 20 20 10")
        control_frame.pack(fill='x')

        ttk.Label(control_frame, text="Material Name:").grid(row=0, column=0, padx=(0, 10), sticky='w')
        self.material_name_var = tk.StringVar()
        self.material_name_var.trace_add("write", self._update_blender_name_caution)
        material_name_entry = ttk.Entry(control_frame, textvariable=self.material_name_var, width=30)
        material_name_entry.grid(row=0, column=1, sticky='we')

        ttk.Label(control_frame, text="Material Type:").grid(row=1, column=0, padx=(0, 10), pady=(10, 0), sticky='w')
        self.material_type_var = tk.StringVar(value=list(MATERIAL_CONFIG.keys())[0])
        material_type_menu = ttk.OptionMenu(control_frame, self.material_type_var, self.material_type_var.get(), *MATERIAL_CONFIG.keys(), command=self.update_ui_for_material_type)
        material_type_menu.grid(row=1, column=1, sticky='we')
        
        control_frame.grid_columnconfigure(1, weight=1)

        # --- Dynamic Blender Name Caution Label ---
        self.blender_name_label = ttk.Label(self, text="", style='Caution.TLabel', anchor='center')
        self.blender_name_label.pack(fill='x', padx=20, pady=(5, 0))

        # --- Main frame for drop zones ---
        self.drop_zones_frame = ttk.Frame(self, padding="20 10 20 10")
        self.drop_zones_frame.pack(expand=True, fill='both')

        # --- Bottom action frame ---
        action_frame = ttk.Frame(self, padding="20 10 20 20")
        action_frame.pack(fill='x')
        generate_button = ttk.Button(action_frame, text="Generate & Save Files", command=self.run_generation)
        generate_button.pack(fill='x', ipady=5)

        # --- Initial UI setup ---
        self.update_ui_for_material_type()

    def _update_blender_name_caution(self, *args):
        """Updates the caution label with the correct Blender material name."""
        base_name = self.material_name_var.get().strip()
        material_type = self.material_type_var.get()
        config = MATERIAL_CONFIG.get(material_type, {})
        suffix = config.get('blender_suffix', '')
        
        if not base_name:
            self.blender_name_label.config(text="Enter a material name to see the required Blender name.")
            return

        blender_name = base_name + suffix
        self.blender_name_label.config(text=f"Your material name in Blender should be: \"{blender_name}\"")

    def update_ui_for_material_type(self, *args):
        """Clear and recreate the drop zones based on the selected material."""
        for widget in self.drop_zones_frame.winfo_children():
            widget.destroy()
        
        self.file_paths.clear()
        self.drop_zone_widgets.clear()
        self._update_blender_name_caution()
        
        material_type = self.material_type_var.get()
        config = MATERIAL_CONFIG.get(material_type)
        if not config:
            return

        # Create new drop zones in a grid
        inputs = config["inputs"]
        for i, input_name in enumerate(inputs):
            row, col = divmod(i, 2)
            
            zone_frame = ttk.Frame(self.drop_zones_frame, style='TFrame')
            zone_frame.grid(row=row, column=col, sticky='nsew', padx=5, pady=5)
            self.drop_zones_frame.grid_columnconfigure(col, weight=1)
            self.drop_zones_frame.grid_rowconfigure(row, weight=1)

            drop_zone = tk.Label(zone_frame, text=f"Drop {input_name}\nImage Here", 
                                 bg='#3c3c3c', fg='#cccccc', relief='sunken', bd=2, 
                                 font=('Helvetica', 11), wraplength=180)
            drop_zone.pack(expand=True, fill='both')

            # Register drop target and bind event
            drop_zone.drop_target_register(DND_FILES)
            drop_zone.dnd_bind('<<Drop>>', partial(self.on_drop, key=input_name))
            
            self.drop_zone_widgets[input_name] = drop_zone

    def on_drop(self, event, key):
        """Handles a file being dropped on a zone."""
        path = event.data.strip('{}')
        widget = self.drop_zone_widgets.get(key)
        if not widget: return

        if os.path.exists(path) and path.lower().endswith(('.png', '.jpg', '.jpeg', '.tga')):
            self.file_paths[key] = path
            filename = os.path.basename(path)
            widget.config(text=f"{key}:\n{filename}", fg="#a6e22e")
        else:
            self.file_paths.pop(key, None)
            widget.config(text=f"Invalid File: {key}\nDrop Image Here", fg="#f92672")

    def run_generation(self):
        """Main function to process and save all required textures."""
        material_name = self.material_name_var.get().strip()
        material_type = self.material_type_var.get()
        
        if not material_name:
            messagebox.showerror("Error", "Please enter a material name.")
            return

        config = MATERIAL_CONFIG[material_type]
        required_inputs = config["inputs"]
        if not all(key in self.file_paths for key in required_inputs):
            messagebox.showerror("Error", "Please provide all required images for this material type.")
            return

        output_dir = filedialog.askdirectory(title="Select Output Folder")
        if not output_dir:
            return

        messages = []
        try:
            # --- Generate _BR.png ---
            if "_BR" in config["outputs"]:
                image = generate_br(self.file_paths["Base Color (RGB)"], self.file_paths["Roughness (A)"])
                path = os.path.join(output_dir, f"{material_name}_BR.png")
                success, msg = process_and_save(image, path)
                messages.append(msg)
                if not success: raise Exception(msg)

            # --- Generate _MEO.png ---
            if "_MEO" in config["outputs"]:
                image = generate_meo(self.file_paths["Metallic (R)"], self.file_paths["Emission (G)"], self.file_paths["Occlusion (B)"])
                path = os.path.join(output_dir, f"{material_name}_MEO.png")
                success, msg = process_and_save(image, path)
                messages.append(msg)
                if not success: raise Exception(msg)

            # --- Generate _B.png (simple copy) ---
            if "_B" in config["outputs"]:
                src = self.file_paths["Base Color (RGB)"]
                dst = os.path.join(output_dir, f"{material_name}_B.png")
                shutil.copy(src, dst)
                messages.append(f"Saved: {os.path.basename(dst)}")

            # --- Generate _BA.png ---
            if "_BA" in config["outputs"]:
                image = generate_ba(self.file_paths["Base Color (RGB)"], self.file_paths["Alpha (A)"])
                path = os.path.join(output_dir, f"{material_name}_BA.png")
                success, msg = process_and_save(image, path)
                messages.append(msg)
                if not success: raise Exception(msg)

            # --- Generate _MESA.png ---
            if "_MESA" in config["outputs"]:
                image = generate_mesa(self.file_paths["Metallic (R)"], self.file_paths["Emission (G)"], self.file_paths["Smoothness (B)"], self.file_paths["Alpha (A)"])
                path = os.path.join(output_dir, f"{material_name}_MESA.png")
                success, msg = process_and_save(image, path)
                messages.append(msg)
                if not success: raise Exception(msg)

            messagebox.showinfo("Success!", "Material generation complete.\n\n" + "\n".join(messages))
        
        except Exception as e:
            messagebox.showerror("Generation Failed", f"An error occurred during processing:\n\n{e}")

if __name__ == "__main__":
    app = App()
    app.mainloop()

