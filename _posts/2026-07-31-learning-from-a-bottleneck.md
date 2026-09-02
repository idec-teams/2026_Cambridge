---
layout: article
title: "Learning from a Bottleneck"
date: 2026-07-31
categories: project-update
---

This week marked our transition from planning into full wet-lab work. We began linearising the pBAD plasmid backbone, started error-prone PCR on the SSB tag and prepared the first tardigrade desiccation dry run. The individual reactions often appeared promising, but one downstream step quickly became the main bottleneck for the entire workflow: recovering clean DNA.

The pBAD linearisation produced a clear band at the expected size, showing that the PCR itself had worked. However, purification after DpnI digestion gave DNA at low concentration and with substantial contamination. Error-prone PCR products showed similar problems. We therefore moved from column-based PCR purification to gel extraction, expecting that isolating the correct band would improve sample quality.

Instead, gel extraction repeatedly failed. Low yields and strong contamination signals appeared across different samples and operators, including a supervised test using a separate sample. Because Gibson assembly requires DNA of sufficient concentration and purity, these failures prevented us from progressing to plasmid assembly and transformation. What first looked like a minor cleanup problem had become the rate-limiting step for the beta-lactamase branch.

The team responded by treating the failure as a structured troubleshooting problem. We increased the number of PCR cycles to raise the starting DNA concentration, compared buffer systems, varied handling steps and considered whether the extraction kit itself was at fault. As repeated attempts ruled out simple operator error, we decided to source a different kit and return to a TAE gel system compatible with it.

In parallel, we investigated the smeared products produced during error-prone PCR. Tests with different polymerases and annealing temperatures showed that mispriming decreased at higher temperatures, allowing us to identify a more suitable range for subsequent optimisation of manganese and magnesium concentrations.

The week also revealed an incorrect base in the original NEXT tag sequence. Although this delayed that branch, finding the error before assembly prevented it from propagating further through the workflow.

This was a week shaped by failure, but it clarified where progress depended on method reliability rather than design ambition. By the end of the week, we had converted several vague problems into specific hypotheses and experiments. That troubleshooting work became an essential part of building a selection pipeline we could trust.
