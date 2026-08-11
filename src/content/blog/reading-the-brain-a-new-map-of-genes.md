---
title: "Reading the brain: a new map of genes, neurons, and behavior"
description: "There is a problem that has haunted neuroscience for as long as the field has existed, one that feels almost philosophical in its stubbornness: a neuron fires, and we watch it."
pubDatetime: 2026-03-04T18:15:03.000Z
tags: []
draft: false
featured: false
source: "substack"
---
There is a problem that has haunted neuroscience for as long as the field has existed, one that feels almost philosophical in its stubbornness: a neuron fires, and we watch it. We record its rhythm, map its neighbors, follow its connections through a tangle of tissue. But we rarely know what kind of thing it is, not truly. We do not know which genes it carries, which molecular identity gives it its particular character, why it responds to light and not to sound, why it joins this circuit and not that one. The activity is visible. The molecule is invisible. Most of the time in neuroscience, these two worlds have been studied separately, like two maps of the same city drawn by people who have never met.

The paper discussed in this post, posted to bioRxiv in February 2026 by Marquez-Legorreta, Fleishman, Hesselink, Eddison and colleagues at Janelia Research Campus and the Donders Institute, is an attempt to draw those maps together, at the scale of an entire brain, at the resolution of a single cell, in an animal that is alive and behaving. The platform they built to do this is called WARP: Whole-brain neuronal Activity and RNA Profiling. What it produces is something genuinely new: a dataset in which every neuron has a face, a voice, and a name.

### The Animal in the Machine

The animal in question is the larval zebrafish, a creature about the size of a grain of rice, transparent, six days old. Its brain contains roughly 100,000 neurons. Those neurons are packed tightly, separated by distances measured in micrometers, and most of them can be watched simultaneously with the right microscope. This is the zebrafish’s gift to neuroscience: accessibility. You can see almost the whole thing at once.

The WARP experiment begins with the fish embedded in a tiny agarose chamber, paralyzed just enough to prevent motion artifacts, its tail connected to suction electrodes that detect the motor signals of fictive swimming, the electrical whisper of movement that never quite becomes movement. Visual stimuli are projected onto a diffuser below: forward motion, backward motion, looming predators, flashes of light and darkness. The fish’s brain responds. The neurons flicker. A light-sheet microscope captures those flickers across the entire brain, two volumes per second, in the form of calcium fluorescence — a proxy for electrical activity so well-established it has become the standard currency of systems neuroscience.

So far, this is familiar territory. Whole-brain calcium imaging in zebrafish has been done before. What WARP does next is what makes it unusual.

### The Map That Follows

After the functional imaging is complete, the fish is fixed — chemically preserved — and embedded in a hydrogel that physically expands it, stretching the tissue to two times its original size. This expansion microscopy step is not merely a technical trick. It is what allows RNA transcripts, the molecular fingerprints of gene expression, to be imaged with enough resolution to be assigned to individual cells. The brain is then subjected to fourteen rounds of fluorescent in situ hybridization, a technique called EASI-FISH, in which colored probes bind to specific mRNA sequences, lighting up the cells that carry them. Forty-one genes are measured this way. Each round is imaged, registered to the previous round, and the signal accumulated.

What the team then had to solve was a registration problem of almost absurd difficulty. The functional imaging, the anatomical reference scan, and the fourteen rounds of EASI-FISH were acquired under different conditions, at different resolutions, with different microscopes, on tissue that had been fixed, dissected, expanded, and physically distorted in multiple ways. Aligning these datasets so that each neuron’s calcium trace could be linked to its gene expression profile required new computational tools. The team built them, and released them as open-source software: BigStream for volumetric image registration, a distributed version of Cellpose for cell segmentation, Fishspot for RNA transcript detection, SpotDMix for assigning transcripts to densely packed nuclei, and SegmentNMF for extracting individual calcium signals from overlapping fluorescence. Each tool solved a problem that existing methods could not.

The result was a dataset of staggering density. Across three animals, more than 238,000 neurons contained both a functional activity trace and gene expression profiles across up to 41 genes. This is 200 to 300 times more neurons with combined activity and gene expression than previous methods had achieved in a single animal.

### What the Map Reveals

With this dataset in hand, the team asked the kind of questions that have long been asked in neuroscience, but rarely answered at scale. Which neurons respond to looming stimuli? Which ones drive swimming? Which ones suppress it? And critically: what are those neurons, molecularly? What genes do they carry?

The answers were specific in ways that previous work could rarely achieve. A population of neurons in the midbrain optic tectum co-expressing the genes pou4f2 and cckb responded selectively to dark flashes and looming stimuli, the visual signatures of an approaching predator. A cluster of glycine-releasing inhibitory neurons in the caudal hindbrain, identified by their expression of glyt2 and gfra1a, ramped up continuously during swimming and appeared to provide negative feedback once the movement was complete. Neurons in the dorsolateral pallium co-expressing eomesa and pvalb7, a region previously proposed as a fish homologue of the mammalian hippocampus — showed structured task-related activity, suggesting that this hippocampal-like circuit is already functionally engaged in the first week of life.

Across the full dataset, the team identified over 2,000 distinct neuronal subpopulations, each defined by a specific combination of functional response, gene expression profile, and anatomical location. This is not a catalogue in the pejorative sense — a list of parts without a story. It is a framework for asking mechanism questions that could not previously be asked. If you know which genes mark a behaviorally relevant population of neurons, you can build a transgenic line that targets them specifically, perturb them optogenetically, and determine their causal role. WARP turns a correlation into a handle.

### The Principle Behind the Map

Perhaps the most conceptually interesting finding is not any single identified population but a general principle that emerges from the dataset as a whole. The team asked whether neurons that share gene expression tend to share activity patterns, whether molecular identity, in a statistically meaningful sense, predicts functional coupling.

To answer this, they devised a measure called the Local Correlation Difference, or LCD. For any pair of neurons expressing the same gene, the LCD compares how correlated their activity is with how correlated one of them is with nearby neurons that do not express that gene. It is a way of asking: is this shared gene doing something for the circuit, or is the correlation just a consequence of proximity?

The answer, for the majority of the 39 genes tested, was that shared gene expression genuinely predicts shared activity, above and beyond what neighborhood effects alone could explain. This held during spontaneous activity and was further enhanced during visual stimulation. The principle is not absolute, some genes showed weak or no effect, and the relationship varied considerably across brain regions, but it is pervasive enough to be called brain-wide. It is, in the language of the paper’s discussion, evidence that a cell’s molecular identity constrains its functional role. The brain is not organized by location alone. It is organized, at a level that runs through almost every region, by what its cells are made of.

### An Honest Horizon

It would be easy to overread a study like this, to see in it the solution to a problem rather than a particularly powerful new way of approaching it. The authors are careful not to do this. WARP currently measures 41 genes; the vertebrate genome contains roughly 20,000. The registration accuracy, while impressive at approximately 80% cell correspondence, is not perfect. The animals are six-day-old fish, and the behaviors studied — swimming, visual processing, futility-induced passivity — are relatively simple. The gap between a zebrafish responding to a looming dot and a human navigating a social world is not closed by this paper.

What WARP does close is a different gap — the one between the two maps that neuroscientists have been drawing separately for decades. It does not close it completely. But it makes the task of closing it imaginable in a way it was not before. The platform is open-access. The data are deposited. The software is on GitHub. Other researchers can use it, extend it, apply it to other species and other questions. The map is not finished. It is, for the first time, shared.

The question that lingers, and perhaps should, is this: if molecular identity shapes functional role across the whole brain — if what a neuron is constrains what it does — what does that mean for our understanding of how neural circuits evolve, develop, and go wrong in disease? The WARP dataset does not answer that question. But it is, quietly, the kind of resource from which such answers might one day be built.

#### Some references:

-   Marquez-Legorreta E, Fleishman GM, Hesselink LW, Eddison M, et al. (2026). Whole-Brain Co-Mapping of Gene Expression and Neuronal Activity at Cellular Resolution in Behaving Zebrafish. bioRxiv. [https://doi.org/10.64898/2026.02.07.704095](https://doi.org/10.64898/2026.02.07.704095)
    
-   WARP open-access dataset: [https://figshare.com/s/d1d19b105c4f74865c32](https://figshare.com/s/d1d19b105c4f74865c32)
    
-   WARP GitHub (analysis code, BigStream, SpotDMix, SegmentNMF): [https://github.com/zebrafish-WARP/WARP](https://github.com/zebrafish-WARP/WARP)
    
-   Wang Y et al. (2021). EASI-FISH for thick tissue defines lateral hypothalamus spatio-molecular organization. Cell 184, 6361–6377.
    
-   Stringer C et al. (2021). Cellpose: a generalist algorithm for cellular segmentation. Nature Methods 18, 100–106.

---

*Originally posted on [Draw an Owl 🦉](https://drawanowl.substack.com/p/reading-the-brain-a-new-map-of-genes). Subscribe & Sustain on [Substack](https://drawanowl.substack.com/subscribe)!*
