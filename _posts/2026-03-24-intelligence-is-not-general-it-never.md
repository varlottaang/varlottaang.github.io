---
title: Intelligence Is Not General. It Never Was.
description: A preprint by Goldfeder, Wyder, LeCun, and Shwartz-Ziv proposes abandoning
  the concept of AGI — and building something more honest. And more powerful.
date: '2026-03-24 20:00:46 +0000'
source: substack
---

There is a moment in the history of every major scientific idea when the word used to describe it begins to cause more damage than it prevents. Phlogiston was a plausible theory until it wasn't. The ether filled a conceptual void until Michelson and Morley drained it of meaning. Today, argue Judah Goldfeder, Philippe Wyder, Yann LeCun, and Ravid Shwartz-Ziv in a preprint published on 27 February 2026, something similar is happening with the three most inflated letters in the field: AGI.

The paper — titled AI Must Embrace Specialization via Superhuman Adaptable Intelligence — is not a manifesto against advanced artificial intelligence. It is something more precise: an argument that the framework within which we are thinking about AI's future is wrong from the ground up, and that replacing it with a more honest one is not merely a philosophical exercise but a necessary condition for making real progress.

_The problem is not the ambition. It is the word._

### What "General" actually means — and doesn't

"General" is a word that appears to say everything and ends up saying nothing. When Demis Hassabis claims that the human brain is general in the sense of a Turing machine, and when OpenAI uses the same word to describe systems that outperform humans on economically significant tasks, they are using identical language to point at radically different things. The result, as the authors document by surveying definitions across the literature and the industry, is a debate in which no one is actually discussing the same object — and everyone is convinced they are.

_The paper's most interesting move is this: rather than proposing yet another definition of AGI, the authors attack the problem upstream. They ask whether human intelligence is genuinely general. The answer is no — and the demonstration is more sober than you might expect._

Magnus Carlsen is the strongest chess player ever seen. Any mid-range computer beats him without effort. Not because Carlsen is mediocre — he is extraordinary, at the absolute peak of what a human being can do. It is simply that humans, as a species, are quite bad at chess. We find it difficult because playing chess never helped anyone survive on the savanna. Our perception of our own capabilities — and our limits — is distorted by the fact that we cannot see our own blind spots. We feel general because we cannot perceive how specialised we actually are.

This is Moravec's paradox applied at the conceptual level. The things that come easily to us — walking, recognising a face, catching an ironic tone — are enormously difficult for computers and computationally expensive. The things that are hard for us — playing chess, predicting protein structures, optimising high-dimensional functions — are often trivial for machines. We are not general: we are specialised for survival in a specific physical and social environment. The illusion of generality depends on our inability to see what we cannot do.

### Why specialisation wins — and why it was always going to

There is a theorem in machine learning that researchers have known for decades and that gets regularly ignored in press conferences: the No Free Lunch theorem. It is worth pausing here, because it is the mathematical hinge of the entire argument.

The No Free Lunch theorem states, in its most direct form, that no learning algorithm performs better than all others across every possible problem. If a system gains efficiency on one type of task, it pays for that gain somewhere else. The resource — computation, memory, time — is finite. Distributing it across an infinite range of different tasks means allocating a share that approaches zero to each of them. Think of it this way: if you have to prepare for a hundred exams simultaneously with the same fixed number of study hours, your average might be respectable, but the depth on any individual subject will necessarily be shallow. A system designed to "know everything" ends up excelling at nothing — not through any failure of design, but through mathematical constraint.

AlphaFold is the example the authors cite, and rightly so. It did not become the most accurate protein structure prediction system in the world by being broadly capable. It became the best because it was specifically, obsessively optimised for that one problem — architecture, data, loss function, all of it concentrated on a single objective. Nothing distracts it. Nothing siphons computational resources toward folding laundry.

_The AI that folds our proteins should not be the AI that folds our laundry._

That line from the paper is not just a good joke. It is a compressed version of an argument that holds: a system forced to do both will excel at neither, unless it recovers specialisation internally through routing or dedicated modules. And at that point, it has already conceded that generality was an architectural fiction.

There is also a subtler phenomenon at work when a single system is forced to handle very different tasks: negative transfer. When two tasks require incompatible internal representations, or produce gradients that contradict each other during training, learning one can actively degrade performance on the other. Generality is not just expensive. In certain configurations, it is actively counterproductive.

### SAI: a different name for a more honest idea

The authors' proposal is called Superhuman Adaptable Intelligence — SAI. The definition: a system capable of adapting to surpass humans on any task humans can perform, and capable of adapting to tasks outside the human domain that carry genuine utility. This is not a definition of what a system already knows how to do. It is a definition of how quickly it learns to do new things. The metric is not a catalogue of competencies — it is the speed of skill acquisition.

This shift — from performance to adaptation — has immediate practical consequences. An evaluation framework built around adaptation speed is measurable, updatable, and does not require producing an ever-lengthening list of benchmarks to be cleared. It is also more honest about what AI can realistically become: not an omniscient entity, but a system that learns what is needed with extraordinary efficiency.

Two architectural directions are identified as plausible paths toward SAI. The first is self-supervised learning — and it is worth explaining why it matters here.

Self-supervised learning is a training approach that does not depend on large-scale labelled datasets — those enormous collections in which every example has been manually annotated by humans. Instead, the system learns to find structure in data on its own, using the data itself as the supervisory signal: for instance, learning to predict the hidden portion of an image, or the missing word in a sentence. The remarkable result — still not fully understood — is that systems trained this way develop extraordinarily rich and transferable representations of the world. GPT, BERT, and their successors are all products of self-supervised learning. This capacity to extract generalisable structure from unlabelled data is precisely what a system needs if it is to adapt rapidly to new tasks without starting from scratch each time.

The second direction is world models — internal representations of how the world works that allow a system to simulate the consequences of its own actions before taking them.

A world model is, in essence, an internal map of how things unfold — not a static map, but a dynamic model that supports prediction: if I take this action in this context, what happens next? Humans and animals use this continuously. When you plan a route through an unfamiliar city, you are mentally simulating the consequences of turning left or right without having to physically try both options. A system equipped with a world model can do the same: plan, transfer knowledge from one context to another, and adapt to situations it has never encountered without requiring full retraining. It is the difference between a system that has memorised millions of specific examples and one that has understood the underlying structure — and can therefore apply it flexibly.

The point is not that these are the only possible paths to SAI. The authors are explicit in rejecting the idea of a single architecture that resolves everything. The point is that the concept of SAI naturally orients research toward systems that favour rapid adaptation, rather than toward ever-larger models trained to do more things at once.

### What remains unresolved

The paper has its open edges, and the authors acknowledge them. The SAI definition includes tasks "with utility" outside the human domain — but what does utility mean, and who decides? The authors explicitly declare this question orthogonal to their main argument and defer it to other work. That is a defensible choice, but it is also the point where a careful reader might push back: shifting the problem from generality to utility does not dissolve it. It relocates it.

There is also the question of how practical it actually is to stop talking about AGI. The term is now embedded in legal documents, commercial agreements, and public expectations. Redefining the target requires not just conceptual clarity but the capacity to reorient a public conversation that has been organised around that word for decades.

And yet there is something intellectually healthy in what this preprint does. It is not a critique of AI progress. It is a critique of the quality of thinking with which we are guiding it. If we genuinely want to build systems that learn quickly, that fill the gaps where humans are systematically limited, that work in complementarity with us rather than in imitation of us — perhaps the first step is to stop using ourselves as the unit of measurement.

#### If you want to go deeper

-   Goldfeder, Wyder, LeCun & Shwartz-Ziv (2026). AI Must Embrace Specialization via Superhuman Adaptable Intelligence. arXiv:2602.23643. The preprint itself — not yet peer-reviewed, but readable without a machine learning background if you skim the formal sections.
    
-   Chollet, F. (2019). On the Measure of Intelligence. arXiv:1911.01547. The paper that most rigorously challenged existing intelligence benchmarks and proposed adaptation speed as the right metric. Essential background for the SAI argument.
    
-   Jumper, J. et al. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596, 583–589. The result the authors use as their central case for what focused specialisation can achieve.
    
-   Wolpert, D. & Macready, W. (1997). No free lunch theorems for optimization. IEEE Transactions on Evolutionary Computation, 1(1), 67–82. The original theorem. The mathematics is technical; the abstract and introduction are not.
    

#### Open questions

1\. If the most capable AI systems of the next decade turn out to be networks of specialised agents rather than single general models, what does that imply for how we think about accountability — and about who is responsible when something goes wrong?

2\. The SAI framework measures intelligence by speed of adaptation. But adaptation toward what? The question of who defines "utility" — left open in this paper — may be the most consequential design decision in the field.

3\. We have spent years asking whether AI will surpass human intelligence. This paper suggests that framing was always confused. What changes — in policy, in public understanding, in how we build these systems — if we genuinely accept that human intelligence was never the right benchmark to begin with?

**©** 2026 Angelo Varlotta — [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.en) Free to share with attribution. Commercial use and modifications not permitted.

---

*Originally posted on [Draw an Owl 🦉](https://drawanowl.substack.com/p/intelligence-is-not-general-it-never). Subscribe & Sustain on [Substack](https://drawanowl.substack.com/subscribe)!*
