---
layout: page
title: Carbenicillin selection system
permalink: /project/carb_selection/
---

## Conceptualization  
Our EB tags theoretically function by disrupting the interaction between the host protein and other molecules which may hinder its function. A mutant beta-lactamase protein was identified to form aggregation prone intermediates which lowers the minimum inhibitory concentration for e coli transformed with this gene. This aggregation is caused by a point mutation of (mutation) that causes the protein to aggregate through hydrophobic interactions with other mutants.

Thus, a tag could be added to the mutant beta-lactamase such that they disrupt this interaction thus increasing the solubility of the beta lactamase. This would increase the minimum inhibitory concentration making the differentiation between different tags viable via altering the carbenicillin concentration.

## Carbenicillin Delivery  
Carbenicillin being bactericidal meant that variable concentrations of carbenicillin would induce a different starting population count once carbenicillin action has occurred. This would lead to the population recovery time of each concentration to be different. Thus, population data is used as a proxy for fitness of the population.

### Liquid Batch Selection  
Falcon tubes with different final concentrations of carbenicillin would be prepared. The tubes would then be seeded with a population with the seeding density normalized. 

Initially, the mass of the final pellet would have been used as the proxy for population which would be used to inform us of the presence of survivors and the trends in population as the relative fitness of the population. 

This would have been ineffective as it only allows for one measurement at the final time point which fails to showcase trends. This would have been high risk as we would be unable to probe if our selection method works until sequencing nor would it provide us a data source for fitness.

Furthermore, this method does not guarantee that the differences in the final mass of the pellets are statistically significant nor does it guarantee that the final mass of the pellet is measurable accurately using the equipment available. In addition to technical difficulties of removing all supernatants and the difficulty of doing replicates of each tube at a range of concentrations for each strain, an alternative proxy was used instead.

OD600 readings via a 96-well plate reader were used instead of mass of pellet as a proxy for population. Whilst it still carries the risk of carbenicillin not inducing a significant enough difference in starting population to see visible trends in population, OD600 readings allow for the establishment of trends, live during the selection process.

Coupled with the lesser technical burdens of carrying out OD600 readings, this was our choice of dependent variable used for the carbenicillin selection system.

### Plate Selection  
Carbenicillin plates of various concentrations would have been prepared, and samples would have been spread to form replicate serial dilutions. Colony count would have been used as the proxy for population. This has the same disadvantage as the mass of the pellet proxy used in liquid batch selection. 

This selection method would have also not been feasible budgetarily due to the concentrations of plates required to distinguish variants.

### Carbenicillin Concentrations: Limitations  
Carbenicillin exists in different mediums in both selection methods. In liquid batch selection, it is freely moving whilst in plate selection, it is fixed to a region in a gel. A limitation of the liquid batch selection is that due to carbenicillin being free moving, the global concentration of carbenicillin is dropping due to breakdown from variants. This means that many weak variants can survive as they are all cumulatively breaking down carbenicillin which leads to a weaker selection pressure. This problem is not encountered in plates as carbenicillin acts on the E coli grown in its respective region, meaning that only local carbenicillin decreases, minimizing the effect. 

We posited that this effect is not significant. Even though global carbenicillin concentrations are lower than initial, the varying concentrations are still high enough to exert a differential selection pressure across batches. Furthermore, dead cells in the liquid batch selection do not contribute to the degradation rate as the beta lactamase is being degraded constantly, thus only active living E coli can contribute to the degradation, limiting this effect further.

## Library Selection  
A library of tags would be assembled via Gibson assembly to form our tag-host protein plasmid to be transformed. This means that a population would contain a range of high and low performing variants. Carbenicillin concentrations would then be able to remove a higher proportion of lower performance variants.

We posited that the seeding density is high enough and our pool of possible variants are small enough such that the library has whole representation. The seeding density was 0.05. At the lowest volume used (2 mL), we have a minimum of 4.8 x 10^8 cells. Our library sequence space is 10^6 and 10^8 for SSB and NEXT, caveat being the De Novo tag of 10^50. With the successive losses of variants in each stage of the cloning process, we have at minimum x5 coverage for NEXT tag.

The OD trends given by the library will be indicative of whether our selection system works and the comparison of different strains is indicative of performance.

The carbenicillin selection system can also be used as a benchmark for tag performance when a monoclonal variant is compared against the original tag.

## Expected Trends  
Based on the bactericidal action of carbenicillin, the OD600 readings are expected to drop, with a steeper decrease based on higher concentration of carbenicillin at the same time. After the carbenicillin has fully acted on the population, the surviving population will begin to divide and recover. Before saturation is hit, the populations at the same time point will be lower for higher concentrations of carbenicillin action. Lastly, saturation will inform the presence of survivors.  
It is not known whether a decrease will be seen as the doubling rate of E coli may be higher than the decay of the population. Thus, either trend will be indicative of whether selection works.

Furthermore, it is not known if a significant difference will be observed. Thus, sequencing will still proceed regardless of OD data.

# Pilot Experiment  
A pilot experiment was conducted to investigate the suitable concentration of carbenicillin to use in each batch. Based on literature, the MIC of mutant beta-lactamase is 100 ug/mL whereas the MIC of WT beta lactamase is 2000 ug/mL. It was postulated that the maximum recovery of the mutant beta lactamase must be the MIC of the WT beta lactamase, and the minimum inhibitory must be below the MIC of the MT beta lactamase. Therefore, concentrations of 0, 50, 100, 250, 500, 1000, 2000, and 3000 ug/mL was used. Below 100 ug/mL was used to quantify if tag interfered with host protein, above 2000 ug/mL was used to ensure sufficient selection pressure has been applied.

Furthermore, both destructive and non-destructive sampling were performed to test if there is significant difference between the methods. Triplicate 100 uL samples were taken and placed into a 96 well plate reader. Destructive sampling involved incubating the selection tube and doing a sample at each time point whereas non-destructive sampling involved incubating the sample within the plate. 

### Results: Pilot Experiment  
It was found that the mutant beta lactamase had no significant difference between the different concentrations whereas the pBAD had not grown in the presence of any concentration of carbenicillin. 

This indicates that carbenicillin is acting on the population, as shown by the pBAD not growing, however, the non-difference of the mutant beta lactamase not showing any difference could be due to a few factors. The first was that our mutant beta-lactamase that we obtained from literature was not aggregation prone. The second was that carbenicillin took a longer time to act on the E coli with any form of resistance gene. The third was that the reported MIC of both beta lactamases were not accurate. 

The first reason was probed by looking at sequencing data to confirm our construct matches the reported literature gene. Thus, if it were indeed that the reported variant is not aggregation prone, no work could be done to mitigate this. Thus, work was done to mitigate the other factors.

The second reason will be resolved by running the selection for longer. 

The third reason was probed for by reinvestigating the literature. The reported promoter literature used was postulated to be weaker than our promoter, thus the true MIC of beta lactamase in our system is significantly higher than that of the reported MIC. Thus, a higher concentration of carbenicillin was used: 0, 5k, 10k, 15k, 30k, 40k ug/mL.

Another discovery was that practically, non-destructive sampling did not seem to yield actionable data. The OD600 reading from those samples did not change significantly and there was significant differences between destructive and non-destructive sampling methods. It is unlikely that this effect is due to sampling bias due to coverage of the population. It is suspected that the 96 well plate did not have ideal incubation conditions due to difficulty in mixing and equilibriating the temperature of each well. Thus, destructive sampling will be used in further rounds of experiment.

## Carbenicillin Selection  
Using the results of the pilot, we modified our methodology and repeated the experiment. 

### First Round  
Our first repeat was done using a total batch volume of 5 mL across 24 hours. All strains were used. This gave us the control data that proved our methodology works which is highlighted in the report. 

Sequencing of the higher concentration batches informed us that our cultures had been skewed due to non-selective factors. The samples we used were transformed and incubated overnight at 37 Celsius which caused the culture to reach saturation. This created a bias towards a single variant even in the zero concentration batch. This was grounds for repeating our experiment.

### Second Round  
The exact same experiment was repeated, but with a total batch volume of 2 mL. Cultures were retransformed and reculture such that the culture did not reach saturation. No controls were used due to technical mishaps. The seeding density of the cultures was lower than intended due to technical errors. This experiment did not yield significant data due to minimal changes in OD600 readings for analysis.

### Third Round  
The same experiment was repeated with a total batch volume of 3 mL. Cultures were reincubated at 25 Celsius and barely hit saturation. No controls were used due to technical mishaps. The seeding density was 0.05 a.u. The experiment yielded OD600 data that was used in analysis.