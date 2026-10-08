---
layout: page
title: Protein mutator
permalink: /project/prot_mutator/
---

### Conceptualization
The protein mutator is intended to do random or semi-random mutagenesis on a sequence in order to generate a library of variants.

### Functions
The protein mutator requires users to specify the range of mutations, number of mutants to be generated, and types of mutations required.

In random mutation, all amino acids have an equal chance of replacing an amino acid in the defined range. In semi-random mutation, users are able to define the amino acids that are allowed to replace the specified range and the probability at which it does so. 

We developed an additional mutation type where amino acids will only be replaced by amino acids that have similar characteristics as the template amino acid. Predefined groups of amino acids were created based on charge, polarity, size, and unique properties. The template amino acid has an equal chance of being replaced by another amino acid in the same group.

### Use
The protein mutator was used to generate a thousand variants per specified five and three amino acid intervals. This was used to cover the variant space that is available to the template sequence. 

Practically, we found that using random mutagenesis yielded better results downstream.
