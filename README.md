# soc-ransomware-isolation-lab

Hands-on SOC lab built as preparation for BCE's (Broadcasting Center Europe) internship posting, **"Automated Air-Gap and Ransomware Isolation in Media Storage Networks."** A physical Wazuh SIEM/SOAR deployment, Windows/Linux endpoint detection, a simulated media storage node with file integrity monitoring, network IDS, and Python/Ansible automation that detects a ransomware-like event and automatically isolates the affected node, fails over to a clean worker, and generates a forensic report — end to end, tested against real hardware and real traffic (no real malware used).

## Where to start

| If you want... | Go to |
|---|---|
| The clean, reviewable portfolio (playbook, evaluation results, real scripts) | [`BCE-RTL-SOC-LAB/`](BCE-RTL-SOC-LAB/) |
| The full, dated build history — every command, every error, every fix | [`LAB-SOC-BCE-build-log.md`](LAB-SOC-BCE-build-log.md) |
| An interactive, phase-by-phase walkthrough (17 phases) with real lessons-learned | [`lab-soc-bce.html`](lab-soc-bce.html) — open in a browser |
| Practical Wazuh operation training — dashboard navigation, reading alerts like an analyst, building custom dashboards, safe attack simulation, real-world SOC exercises | [`wazuh-treinamento-analista.html`](wazuh-treinamento-analista.html) — open in a browser |
| A specific how-to (adding an endpoint, Wazuh rules, Ansible, containerlab, Python automation patterns) | the `GUIA-*.md` files — start with [`GUIA-00-ORDEM-DE-INSTALACAO.md`](GUIA-00-ORDEM-DE-INSTALACAO.md) |
| A suggested 8-week self-study schedule | [`plano-8-semanas.html`](plano-8-semanas.html) |

## What's real vs. what's a template

Every artifact in this repository reflects an actually-built, actually-tested system on a home lab (`192.168.178.0/24`), not a hypothetical design. `lab-soc-bce.html` intentionally keeps generic example IPs (`192.168.1.0/24`) so it can double as a public, shareable tutorial — the real IPs and machine-specific details live in the build log and `BCE-RTL-SOC-LAB/`.

## Status

16 of 17 planned phases complete (Wazuh SIEM/SOAR, Windows/Linux endpoint detection, media server + FIM, Suricata IDS, Python automation, Ansible, programmatic network isolation, Active Response, Docker-based failover, forensic alerting, latency/throughput evaluation, and a full-scale ransomware simulation that found and fixed a real forensic-evidence-loss bug under load). Physical config backup (Fase 16) was intentionally skipped — no external backup drive available in this environment. See the build log's "Próximas fases" checklist for the authoritative, up-to-date status.
