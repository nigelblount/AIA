# Team Execution Cadence

## Purpose
Keep ownership, handovers, and progress visible in real time.

## Update rhythm
- **Scheduled:** 12:00 and 18:00 (Europe/Prague)
- **Ad-hoc:** post immediately for milestones, blockers, or decisions needed

## Required update format
- **Done:** what shipped (with commit/PR link if available)
- **Next (owner):** immediate next task + owner
- **Blocked by:** dependency or `none`
- **Handover:** `X -> Y`, deliverable, deadline

## Handover rules
1. Every handover must name owner and deadline.
2. Receiver confirms acceptance in-thread.
3. If blocked >60 min, escalate in chat.
4. No silent task drops.

## Roles (current)
- **Corn:** orchestration, scope control, integration checks, status reporting
- **Linus:** architecture, infra, deployment, backend foundations
- **Cletus:** product workflow implementation, UX execution

## Decision protocol
Escalate to Nigel only for:
- Scope tradeoffs (must-have vs defer)
- Priority conflicts across owners
- External constraints (cost, timeline, dependency risk)
