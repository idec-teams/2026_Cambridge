---
layout: page
title: Reverse translation tool
permalink: /project/rev_translation/
---

### Conceptualization
The reverse translator is designed to compact our list of ideal sequences to validate via wet-lab selection to increase the throughput of our wet-lab selection method. Instead of sequencing tens of variants to each be cloned and selected on, a single library of millions can be cloned and selected in one experiment.

Multiple iterations of this programme were developed to address the problems that appear in testing. V1 - V3 focused on the development of the compaction method, V4 - V5 focused on the quality of the compaction method.

### Function
All combinations of the IUPAC degenerate nucleotide letters were first generated. These degenerate codons were then associated with the set of amino acids they can encode with degenerate codons that encode stop codons being removed. The set of amino acids in the sequence is then compared against all sets of amino acids encoded by degenerate codons. The programme then optimizes to minimize loss of amino acids in the sequence set and the off-target addition of amino acids in the sets of amino acids encoded by the degenerate codons.

Three different optimization algorithms were tested with the most effective being direct minimization of the loss and off target rate. Other algorithms attempted were assigning different weights to the two parameters and minimizing the weights via brute force using a grid search and extrapolation into a surface to find the minima.

Once the optimal codon is found, the amino acid is represented by it. This is then repeated across all amino acids to generate the full degenerate sequence.

### Iterations: V1 to V3
V1: Implemented the initial logic of comparison between sets to produce best fit
V2: Implementation of weights to attempt optimization of degenerate sequence
V3: Implementation of optimization methods (grid & surface optimization)

These iterations saw the development of the backbone of the programme. The main two parameters used in the quality control was the degree of loss and the degree of off-target representations in each position. 

It was found that direct optimization of both parameters yielded optimal results.

### Quality Control
An attempt to measure the quality of our degenerate sequences were made by attempts to measure the proportion of input sequences which are encoded by our degenerate sequence.

Firstly, it was found that the compaction had a sequence space that was far too large to be practical (10^50 and above). Secondly, despite the sequence space, nearly none of the input sequences were encoded in the degenerate sequence.

This was due to the combinatorial complexity of degenerate sequences. The programme optimizes based on per positional information whilst encoding of input sequences requires combinatorial information globally. In addition, the off-target inclusions further exacerbates the sequence space problem through combinatorial increase in off-target sequences.

Thus, an alternative approach to both quality control and degenerate sequence generation is required.

This led to the use of the filtering as both a scoring metric and a mechanism of increasing the quality of degenerate sequences produced. 

The importance is not the sequences being encoded but the properties that the input sequences have, therefore, even if the sequence information is lost, as long as the properties are maintained, the library is good. Using this, we score degenerate sequences by sampling 100k variants, scoring, and filtering the library to find the proportion that passes our initial filtering conditions.

The quality of the degenerate sequences improve generally when the input sequence library size is smaller. Thus, further filtering of the input sequences could theoretically improve the quality of our degenerate sequence further, this led to the eventual development of the proportion optimization algorithm for degenerate sequence generation.

### Iteration: V4 to V5
V4: Implementation of stop codon check
V5: Implementation Hemingway Distance optimization

These iterations were used to address the problems found in the degenerate sequences produced in V3 during quality control. It was found that the majority of our degenerate sequences produced nonsense or useless sequences due to premature stop codons, which was fixed in V4.

V5 was developed to address the combinatorial increase in off-target sequences encoded by degenerate sequences. The idea was that if the whole input list is causing the encoding space to increase exponentially, then we can subcategorize within an input set to produce multiple degenerate sequences whose total encoding space is smaller due to the lack of combinations of off-target amino acids.

This was done by implementing the Hemingway Distance sorting algorithm. Each sequence list was separated into 1 to 20 bins, with each degenerate sequence scored. 

We decided to forgo this optimization method as the method separated mutation regions which would have significantly reduced the mutation coverage of our final degenerate sequences.

Through this, the degenerate sequence compaction was completed and further work on improving the sequence was done via proportion optimization.
