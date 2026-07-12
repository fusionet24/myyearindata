# De-LLM-ify Skill (dellmify)

Strip the tells of AI writing out of a draft and rewrite it in the **MyYearInData** voice — the plain, first-person, British, hands-on style of the blog's pre-2025 posts.

The goal is *not* to defeat AI detectors for the sake of it. The goal is to make writing sound like Scott actually wrote it: a data engineer talking to other engineers, not a language model performing "thought leadership".

This skill has two halves:

- **Part A — What to strip out.** The signs of AI writing, adapted from the Wikipedia article [*Wikipedia:Signs of AI writing*](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).
- **Part B — What to write instead.** The house vocabulary and voice, taken from the blog's genuinely-human posts written before 2025 (`welcome`, `tools-for-consultants`, `handling-uk-bank-holidays-in-adf-pipelines`, `deploying-*`, `adf-copy-activity-*`).

---

## Part A — Signs of AI writing to strip out

### A1. Banned / red-flag vocabulary

These words are near-certain tells. Cut them or swap for the plain word. This is not "never use", it's "if you see it in a draft, it's almost always AI puffery — kill it".

**Filler intensifiers & abstractions:**
`delve`, `tapestry`, `testament`, `landscape` (as in "the evolving landscape"), `realm`, `intricate` / `intricacies`, `interplay`, `nuanced`, `multifaceted`, `myriad`, `plethora`, `vibrant`, `rich` (of history/ecosystems), `robust`, `seamless` / `seamlessly`, `holistic`, `pivotal`, `crucial`, `vital`, `paramount`, `key` (as a throwaway adjective), `essential`, `profound`, `groundbreaking`, `cutting-edge`, `state-of-the-art`, `game-changer`, `revolutionize`, `unlock`, `harness`, `leverage` (as a verb), `utilize` (just say *use*), `empower`, `elevate`, `foster`, `cultivate`, `underscore`, `emphasize`, `showcase`, `highlight` (as filler), `garner`, `boast` / `boasts`, `meticulous` / `meticulously`, `bolster`, `enduring`, `indelible`, `renowned`, `esteemed`, `bespoke` (unless literally tailoring).

**Verb inflation — replacing plain "is/are/has":**
"serves as", "stands as", "acts as a testament to", "represents a", "marks a", "boasts a", "features", "offers", "provides a gateway to". Prefer *is*, *has*, *does*.

**Superficial-analysis participles** tacked onto the end of a sentence:
"…, highlighting the importance of…", "…, underscoring its role in…", "…, reflecting the broader…", "…, showcasing…", "…, emphasizing…", "…, ensuring…", "…, paving the way for…", "…, ultimately transforming…". These add nothing. Delete them or fold the point into a real sentence.

**Puffery / press-release tone:**
"in today's fast-paced world", "in the ever-evolving world of", "in the digital age", "at the forefront of", "a wide array of", "a diverse range of", "when it comes to", "the world of X", "it's important to note that", "it's worth noting that", "needless to say", "rest assured".

### A2. Sentence-construction tells

- **Negative parallelism / "not just… but…":** "It's not just X, it's Y", "not only… but also…", "This isn't about X — it's about Y". Rewrite as a plain statement. Occasional use is human; back-to-back use is the tell.
- **"X rather than Y" balancing** used to sound profound: "prioritising clarity rather than cleverness". Fine once; a tic if repeated.
- **Rule of three everywhere:** "clear, concise, and specific"; "faster, cheaper, and more reliable". One triple in a post is natural. Three triples in three paragraphs is a machine.
- **Elegant variation:** swapping synonyms for the same thing to avoid repeating a word ("the model… the system… the framework… the solution" all meaning one tool). Just repeat the plain noun. Engineers repeat nouns.
- **Hollow hedging attributions:** "experts argue", "many believe", "it is widely regarded", "studies show" with no link. Either cite the real source (the blog links things) or cut it.

### A3. Structural tells

- **The formulaic "Introduction" → body → "In conclusion" essay shape.** Older posts open by *dropping you into the problem* ("Sometimes you have processes that you don't need to run in certain scenarios…"), not with a throat-clearing "In this blog post, we'll explore…". Prefer a real hook or a Problem/Solution framing.
- **"Despite its challenges… continues to thrive" outro formula.** Ban outright.
- **Challenges / Future Outlook / Key Takeaways boilerplate headers** bolted on to pad length.
- **Symmetrical, same-length paragraphs.** Humans write a two-line paragraph next to a seven-line one. Vary it.

### A4. Formatting & punctuation tells

- **Em dashes as a stylistic crutch** (`—` sprinkled everywhere for dramatic pause). The old posts mostly use commas, brackets, and full stops. Convert most em dashes to commas, brackets, or two sentences. Keep at most the occasional one.
- **Title Case On Every Header.** Use sentence case for headings ("Government API", "Note taking"), matching the old posts.
- **Bold-on-every-key-term.** Old posts bold sparingly, for genuine emphasis (`**context switching**`, `**annotate**`). Strip decorative bolding.
- **Emoji as bullet markers / section decoration** (📌 ✅ 🚀). Note: the *occasional* inline emoji in a sentence is on-brand (`😃`, `:)`), emoji as formatting scaffolding is not.
- **Curly "smart" quotes** where the source used straight quotes — leave the author's real punctuation, don't upgrade it.
- **Inline-header lists** (`- **Thing:** description`) used for everything. Fine once; not as the whole post.

---

## Part B — The MyYearInData pre-2025 voice

Base the *replacement* vocabulary and rhythm on the blog's early human posts. Traits:

### B1. Voice traits

- **First person, direct address.** "I've been using…", "you know the importance of…", "so we need to handle this after the trigger point." Talks *to* one reader.
- **British English.** optimise, organise, familiarise, behaviour, colour, catalogue, whilst (sparingly), "1-2-1", "gov.uk". Keep it.
- **Conversational connectives** to open sentences: "So…", "Anyway…", "Now…", "So let's restate the problem…". Real speech rhythm.
- **Mild self-deprecation and honesty:** "to be honest it's a little lazy", "several significant failed side projects later", "one successful side hustle (£5 a day FTW!)". Keep the human admission of mess.
- **Parenthetical asides** that add a wink or a caveat: "(if you're reading this)", "(I've a whole post on this coming soon)", "(XGBoost & SVMs 😃)".
- **Concrete and specific over abstract.** Names the real tool, the real API, the real cost, the real annoyance. Never "a variety of solutions" — always *StashPad, GoodNotes, Greenshot, ZoomIt*.
- **Problem / Solution framing** for technical posts: state the real-world problem plainly, then solve it step by step with screenshots and code. Headings like "Problem", "Solution", "Government API", "ADF Pipeline".
- **Short sentences carry weight.** "It works really well for 1-2-1 meetings too." "That causes problems." Let short lines land.

### B2. Swap table (AI phrasing → house phrasing)

| AI draft says | Rewrite as |
|---|---|
| "leverage these tools to optimise your workflow" | "use these tools to take the pain out of your work" |
| "a wide array of applications" | "loads of uses" / "a bunch of things you can do with it" |
| "It is important to note that" | (delete — just say the thing) |
| "This serves as a testament to" | "This shows" / "This is why" |
| "delve into" | "look at" / "get into" |
| "utilise" | "use" |
| "in today's fast-paced landscape" | (delete, or name the actual situation) |
| "seamless integration" | "it just works with" / "it plugs into" |
| "robust and scalable solution" | "something that holds up when it gets busy" |
| "revolutionise the way we work" | "change how I work day to day" |
| "Let's explore…" | "So let's…" / "Here's…" |
| "In conclusion," | (cut, or end on a concrete next step) |

### B3. Before → after (worked example)

**AI-flavoured draft:**
> In today's rapidly evolving data landscape, organisations must leverage robust, scalable pipelines to unlock the full potential of their data. Azure Data Factory serves as a pivotal tool, seamlessly orchestrating complex workflows and empowering teams to delve into their most intricate challenges — ultimately transforming raw data into actionable insights.

**De-LLM-ified (house voice):**
> Sometimes your pipelines need to skip a run, and Data Factory doesn't make that obvious out of the box. I hit this working with market trading data: the exchange is shut on weekends and bank holidays, so there's no point kicking off the process. Here's the pattern I use to handle it.

Note what changed: the abstraction and puffery are gone, a real story and a real problem replace them, the em dash and the participle tail are cut, and it's first-person and specific.

---

## Process

When invoked on a file or pasted text:

1. **Read the source.** If given a `.qmd` post, read the whole file. Note the YAML frontmatter — **do not touch code blocks, YAML frontmatter, image paths, links, or the `ai-label` value**.
2. **Scan for Part A tells.** Flag banned vocabulary (A1), construction tells (A2), structural tells (A3), and formatting/punctuation tells (A4).
3. **Rewrite in the Part B voice.** Preserve the author's meaning, technical accuracy, facts, code, and structure of the argument. Change *how* it reads, not *what* it claims. British English throughout.
4. **Keep it honest.** Don't invent stories, costs, or experiences to sound human. If the draft lacks a concrete hook, prefer trimming the fluff over fabricating a memory — and flag to the user where a real anecdote would help.
5. **Report the changes.** Give a short bullet list of the main tells removed (e.g. "cut 6 em dashes, removed 'leverage/delve/robust', unwound two 'not just X but Y' constructions, de-title-cased 4 headings"). This doubles as an AI-writing audit.
6. **Preserve technical correctness above voice.** Never reword a step, command, or claim into something inaccurate for the sake of tone.

## Hard rules

- **Never alter code fences, ADF/SQL/JSON snippets, commands, URLs, image references, or frontmatter.** Voice edits are prose-only.
- **Never fabricate** first-person anecdotes, numbers, or sources to fake authenticity. Human voice ≠ invented facts.
- **Preserve meaning and technical accuracy.** This is a re-voicing pass, not a content rewrite.
- **British English** spelling and idiom.
- **Sentence case** for headings.
- When the source is already in the house voice, say so and change little — don't "de-AI" writing that isn't AI.
