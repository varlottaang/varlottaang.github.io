---
title: "The Carbon Cost of Machine Learning"
description: "Training large models has a real environmental footprint. Here's what we know, what we don't, and why transparency matters."
pubDatetime: 2026-04-20
tags: ["sustainability", "machine-learning", "environment"]
---

Training a large language model produces CO₂. This is not controversial — it's physics. Running GPU clusters at scale for weeks or months consumes enormous amounts of electricity, and electricity, in most of the world, still comes substantially from fossil fuels.

What's less clear is how much. And that vagueness is doing a lot of work.

## What we can measure

A 2019 paper by Strubell et al. ([*Energy and Policy Considerations for Deep Learning in NLP*](https://arxiv.org/abs/1906.02629)) estimated that training a large transformer model with neural architecture search could produce CO₂ emissions equivalent to five times the lifetime emissions of an average American car. This number circulated widely and provoked some useful discussion.

It also provoked a lot of pushback, partly because the methodology was contested, partly because it was based on specific infrastructure and energy mixes that don't generalise, and partly because the AI industry would prefer not to think about this.

More recent work has tried to improve measurement methodology — tracking hardware efficiency, data centre PUE (power usage effectiveness), energy source mixes, and inference costs in addition to training. But we still lack standardised, independently verified reporting.

## The transparency gap

Major AI labs train some of the largest models in the world. Very few publish detailed energy consumption figures. Some publish nothing at all.

This isn't just an accountability problem — it's a research problem. Without transparent reporting, we can't build the empirical base needed to understand the tradeoffs between model scale, performance, and environmental impact. We can't compare architectures. We can't evaluate whether efficiency gains are keeping pace with scale increases.

The analogy to food labelling is imperfect but useful. Nutrition labels exist because consumers and policymakers decided that knowing what's in your food is a reasonable baseline. There's no reason, in principle, that training and inference energy costs couldn't be disclosed similarly.

## What actually helps

A few things seem clear:

**Efficiency matters.** Smaller, more efficient models that achieve comparable performance are unambiguously better on this dimension. Techniques like distillation, quantisation, and pruning deserve more research attention, not just as deployment tools, but as environmental strategies.

**Where you train matters.** Running compute in regions with higher renewable energy penetration has a real effect. Some organisations already account for this in procurement decisions.

**Inference is the long tail.** Training a model once is a one-time cost. Serving it to millions of users is ongoing. Inference efficiency deserves as much attention as training efficiency.

**Transparency is infrastructure.** None of the above can be evaluated rigorously without better measurement and disclosure.

---

This doesn't mean stop doing ML. It means doing it with an accurate picture of the costs — which, right now, most of us don't have.
