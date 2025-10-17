# Advanced Asset Template Workflows for Horizon Worlds

## Introduction
Asset templates are a powerful feature in Horizon Worlds, and the official documentation provides a strong foundation. This guide builds on that foundation with additional practical tips, workflow strategies, and lessons learned from collaborative projects. The goal is to help teams and advanced creators work efficiently, avoid common pitfalls, and build scalable, maintainable worlds.

---

## 1. Project Organization & Asset Library Structure
- Use a clear folder structure: organize by feature (e.g., /Player, /Environment) or by asset type (/AssetTemplates, /Scripts).
- Adopt strict naming conventions (e.g., AT_FeatureName, TS_ProjectName_ScriptName) to avoid script collisions and confusion.
- Store team assets in shared folders for collaboration; use personal folders for experiments.
- Document your structure and conventions for all collaborators.

---

## 2. The Asset Template Lifecycle: Creation, Updates, and Versioning
- Always use a parent object for your template and double-check hierarchy before creating.
- Save templates to shared folders for team access.
- When updating a template, publish with clear version notes. Communicate changes to your team.
- Updates are not automatic: each world must manually accept asset updates. Assign responsibility for this in your workflow.
- Use version history to roll back if an update causes issues.

---

## 3. Scripting Patterns: Surviving the Deep Copy Gotcha
- Scripts in templates are deep-copied, not linked. Updates to the template’s script do not propagate to placed instances.
- Avoid putting complex, evolving logic inside templates. Instead:
  - Use world-level manager scripts to control template instances.
  - Use event-based communication (e.g., LocalEvent) for decoupling.
  - For dynamic spawning, use a spawner script to configure new instances after placement.
- Always check and re-link entity references in propsDefinition after placing a template.

---

## 4. Collaborative Workflows & Version Control
- Use Git (or another VCS) for all TypeScript scripts. Keep the repo as the source of truth.
- Sync scripts manually between your local dev folder and the world’s auto-sync directory.
- Only one person should update the main world at a time to avoid desyncs.
- Communicate before merging branches or updating shared templates.
- Use world duplication for feature branches, but expect manual merging.

---

## 5. Troubleshooting & Common Issues
- Visual bugs: Template instances may look wrong in the editor but work in-game.
- Script errors: Watch for undefined property errors and missing component issues—double-check propsDefinition and entity assignments.
- Script name collisions: Use unique, prefixed names for all scripts.
- Asset Pool/Spawning bugs: Always test after template or pool updates.
- If a template update breaks something, use version history to roll back.

---

## 6. Performance & Optimization
- Optimize custom models and textures before import (follow Meta’s naming and packing rules).
- Use asset pooling for dynamic objects to reduce performance overhead.
- Avoid excessive cloning of primitives—can quickly hit platform limits.

---

## 7. Pro Tips & Lessons Learned
- If you notice issues after adding new variable groups, persistent variables, or updating templates/scripts, try restarting your world as a troubleshooting step. In most cases, a restart is only needed if problems appear that a normal update or refresh does not fix.
- Document every template update and communicate with your team.
- Use the new findEntity/findEntities APIs for robust runtime references.
- Leverage the Asset Pool Gizmo for multiplayer and per-player assets.
- Stay current with platform updates and bug fixes—Meta is actively improving the system.

---


## 8. Key Reminders and Platform Insights
- Scripts in templates are not updatable after placement—plan your architecture accordingly.
- Manual update acceptance is both a safety feature and something to track in your workflow.
- The collaborative tools are powerful, and establishing a clear process will help your team get the most out of them.

---

## Leveraging AI Tools for Scripting and Productivity

Modern AI-powered IDEs like VS Code and Cursor can greatly speed up scripting and troubleshooting. For scripting in Horizon Worlds, you can also use the Context 7 MCP server to give AI assistants access to up-to-date Meta Horizon Worlds documentation for more accurate help and code suggestions.

- Try: [https://context7.com/websites/developers_meta_horizon-worlds_learn](https://context7.com/websites/developers_meta_horizon-worlds_learn)

These tools can help you write, debug, and understand scripts faster—especially when working with complex asset templates or new APIs.

---

## Conclusion

Asset templates are essential for scalable, collaborative creation in Horizon Worlds. By combining the official documentation with practical workflow strategies, you can avoid common mistakes, work efficiently as a team, and build worlds that are easy to maintain and update.
