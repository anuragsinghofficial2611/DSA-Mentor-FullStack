# 🧠 DSA Mentor

> **Don't just solve DSA problems. Learn how to think about them.**

DSA Mentor is a **full-stack AI-powered Data Structures & Algorithms learning platform** designed to help developers solve problems without immediately revealing the answer.

Instead of simply giving users the solution, DSA Mentor understands **what the user is asking, where they are stuck, and how much help they want**.

The user chooses a **hint level**, and the AI adapts its response accordingly — from a small conceptual nudge to a complete solution with code and complexity analysis.

---

## ✨ Why DSA Mentor?

When learning DSA, directly looking at the solution often makes the problem feel easy without actually developing problem-solving ability.

DSA Mentor follows a different approach:

```text
                 DSA Problem
                      │
                      ▼
              What are you stuck on?
                      │
                      ▼
               Choose Hint Level
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
       Level 1     Level 2      Level 3
       Small       Stronger      Full
       Hint         Hint        Guidance
          │           │           │
          └───────────┼───────────┘
                      ▼
                 AI Mentor
                      │
                      ▼
            Personalized Response
```

The goal is not just to **get the answer**, but to gradually develop the ability to **find the answer yourself**.

---

# 🚀 Features

## 🤖 AI-Powered DSA Mentor

Interact with an LLM-powered mentor specifically designed for Data Structures and Algorithms.

The AI can:

* Explain DSA concepts
* Provide hints
* Analyze your approach
* Debug your code
* Explain why your solution is failing
* Help identify logical mistakes
* Explain time complexity
* Explain space complexity
* Provide complete solutions when requested
* Adapt explanations based on your current understanding

---

## 🎯 Adaptive Hint System

The core feature of DSA Mentor is its **hint-level system**.

Instead of receiving the same response regardless of what you need, you control how much assistance the AI provides.

### Level 1 — 🟢 Minimal Hint

The AI gives you a small nudge without revealing the approach completely.

Example:

> Think about what information you would need to remember while traversing the array.

The goal is to make you think about the next step yourself.

---

### Level 2 — 🟡 Guided Hint

The AI provides more direction while still avoiding the complete solution.

Example:

> Consider using a HashMap to store values you have already encountered. For each element, think about what complementary value you need.

Now you have enough direction to continue solving the problem.

---

### Level 3 — 🟠 Strong Hint

The AI explains the underlying approach more explicitly.

Example:

> Iterate through the array and calculate `target - nums[i]`. Check whether that value already exists in a HashMap. If it does, you have found the required pair.

You still have the opportunity to implement the solution yourself.

---

### Level 4 — 🔴 Full Solution

When the user explicitly wants the complete solution, the AI provides:

* Approach
* Explanation
* Algorithm
* Java implementation
* Time complexity
* Space complexity

Example:

```java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();

    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];

        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }

        map.put(nums[i], i);
    }

    return new int[] {};
}
```

The amount of information increases as the hint level increases.

---

# 🧩 Context-Aware Assistance

DSA Mentor doesn't only look at the problem.

It also considers **what the user has already told the AI**.

For example:

```text
User:
I know I need to use BFS but I don't understand
how to keep track of visited nodes.

Hint Level: 2
```

Instead of explaining BFS from the beginning, the AI focuses specifically on:

```text
visited array
      ↓
why it is needed
      ↓
when to mark a node visited
      ↓
how it interacts with the queue
```

This makes the interaction more like having a **personal DSA mentor** rather than using a generic chatbot.

---

# 🧑‍💻 Code Debugging

Users can also provide their own implementation.

For example:

```java
class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // user's code
    }
}
```

The AI can analyze:

* Syntax problems
* Logical errors
* Incorrect conditions
* Incorrect graph traversal
* Missing visited states
* Infinite loops
* Incorrect edge cases
* Complexity problems

Instead of simply replacing the code, the mentor explains **why the existing approach is failing**.

---

# 📚 DSA Problem Support

Users can interact with the system naturally.

Examples:

```text
"Give me a hint for Two Sum"

"LeetCode 200, level 1 hint"

"I am stuck at the BFS part"

"Why is my DFS returning false?"

"Explain the approach but don't give me code"

"Give me the full solution"

"Why am I getting TLE?"

"Is this approach O(n²)?"
```

The system is designed around **learning through conversation**.

---

# 🧠 LLM Integration

DSA Mentor integrates Large Language Models through APIs.

The backend acts as the bridge between the application and the LLM provider.

```text
┌───────────────┐
│    Frontend   │
│               │
│ Problem       │
│ Hint Level    │
│ User Code     │
└───────┬───────┘
        │
        │ HTTP Request
        ▼
┌────────────────────┐
│      Backend       │
│                    │
│ Request Validation │
│ Prompt Construction│
│ Hint Logic         │
│ LLM Integration    │
└─────────┬──────────┘
          │
          │ API Request
          ▼
┌────────────────────┐
│       LLM          │
│                    │
│ Structured Output  │
└─────────┬──────────┘
          │
          │ JSON
          ▼
┌────────────────────┐
│      Backend       │
│                    │
│ Parse / Validate   │
└─────────┬──────────┘
          │
          ▼
┌───────────────┐
│    Frontend   │
│               │
│ AI Response   │
│ Code          │
│ Complexity    │
└───────────────┘
```

---

# 📦 Structured LLM Responses

Instead of depending on unpredictable plain-text responses, DSA Mentor uses a **defined output schema**.

The backend expects the AI response to follow a consistent structure:

```json
{
  "type": "hint",
  "answer": "Think about what information you need to remember.",
  "hint": "Consider using a HashMap.",
  "explanation": "A HashMap allows constant-time average lookup.",
  "code": "",
  "timeComplexity": "",
  "spaceComplexity": ""
}
```

For a complete solution:

```json
{
  "type": "solution",
  "answer": "Use a HashMap to solve the problem in one pass.",
  "hint": "",
  "explanation": "Store previously visited numbers and search for their complement.",
  "code": "public int[] twoSum(...) { ... }",
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(n)"
}
```

This gives the frontend a predictable contract.

### Application contract

```text
LLM
 │
 ▼
Structured JSON
 │
 ▼
Backend
 │
 ▼
Frontend
```

This makes it easier to render:

* Explanations
* Hints
* Code
* Complexity
* Response types

independently in the UI.

---

# 🔌 LLM Provider Flexibility

The application is designed around an abstraction where the frontend does not need to know which LLM generated the response.

The backend can integrate different providers such as:

```text
Gemini
   │
Grok
   │
OpenAI
   │
   ▼
Common Response Schema
   │
   ▼
Frontend
```

This makes the application easier to extend and experiment with different models.

---

# 🛠️ Tech Stack

## Frontend

* NEXTJS
* JavaScript
* HTML
* CSS
* API integration
* Responsive UI

## Backend

* Node.js
* Express.js
* REST APIs
* Environment variables
* Request validation

## AI

* Large Language Model APIs
* Structured Outputs
* JSON Schema
* Prompt Engineering
* Context-aware responses
* Adaptive hint generation

## Development

* Git
* GitHub
* npm
* `.env` configuration

---

# 🏗️ High-Level Architecture

```text
                         ┌─────────────────┐
                         │      User       │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │    Frontend     │
                         │                 │
                         │ Problem         │
                         │ Hint Level      │
                         │ User Code       │
                         └────────┬────────┘
                                  │
                                  │ REST API
                                  ▼
                         ┌─────────────────┐
                         │     Express     │
                         │     Backend     │
                         └────────┬────────┘
                                  │
                     ┌────────────┴────────────┐
                     │                         │
                     ▼                         ▼
              ┌──────────────┐         ┌──────────────┐
              │ Prompt Logic │         │ Response     │
              │              │         │ Schema       │
              └──────┬───────┘         └──────┬───────┘
                     │                         │
                     └────────────┬────────────┘
                                  ▼
                         ┌─────────────────┐
                         │      LLM API    │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Structured JSON │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │    Frontend     │
                         │                 │
                         │ Hint            │
                         │ Explanation     │
                         │ Code            │
                         │ Complexity      │
                         └─────────────────┘
```

---

# 🔄 Example User Flow

### Step 1 — User selects a problem

```text
LeetCode 1 — Two Sum
```

### Step 2 — User chooses the amount of help

```text
Hint Level: 1
```

### Step 3 — User tells the mentor where they are stuck

```text
"I know I need to iterate through the array,
but I don't know what to store."
```

### Step 4 — AI analyzes the context

The AI understands:

```text
Problem → Two Sum
+
User's current approach
+
Where the user is stuck
+
Requested hint level
```

### Step 5 — AI generates an appropriate response

Instead of revealing the HashMap solution immediately:

> Think about what information from the previous elements could help you determine whether the current element completes the required pair.

### Step 6 — User asks for more help

```text
Hint Level: 2
```

The AI provides a stronger hint.

Eventually:

```text
Level 1
   ↓
Level 2
   ↓
Level 3
   ↓
Full Solution
```

The learner controls the progression.

---

# 🎨 User Experience Philosophy

DSA Mentor is built around one principle:

> **Give the user exactly enough help to move forward.**

The system should avoid creating dependency on AI-generated solutions.

Instead:

```text
Attempt
   ↓
Get stuck
   ↓
Small hint
   ↓
Think
   ↓
Try again
   ↓
Stronger hint
   ↓
Think again
   ↓
Solution
```

This creates a more active learning experience.

---

# 🔐 Environment Variables

Create a `.env` file in the backend and add the required API credentials.

Example:

```env
AI_API_KEY=your_api_key_here
```

Never commit API keys to GitHub.

Make sure `.env` is included in `.gitignore`:

```gitignore
.env
node_modules/
```

---

# ⚙️ Installation

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
```

Move into the project:

```bash
cd <PROJECT_NAME>
```

Install dependencies:

```bash
npm install
```

Configure your environment variables:

```env
AI_API_KEY=your_api_key
```

Start the development server:

```bash
npm run dev
```

If your project uses separate frontend and backend commands, start each application according to its respective package configuration.

---

# 📡 API Concept

The frontend sends a request containing the user's message and relevant learning context.

Example:

```json
{
  "message": "I am stuck at the BFS traversal part",
  "hintLevel": 2
}
```

The backend processes the request and communicates with the LLM.

The backend returns a structured response:

```json
{
  "response": {
    "type": "hint",
    "answer": "...",
    "hint": "...",
    "explanation": "...",
    "code": "",
    "timeComplexity": "",
    "spaceComplexity": ""
  }
}
```

This separation keeps the LLM integration on the server and prevents exposing API credentials to the frontend.

---

# 🧪 Example

### User

```text
LeetCode 1971

I know I need BFS but I'm confused about
when to mark a node as visited.

Hint Level: 1
```

### AI

```text
Think about the purpose of the visited array.

Ask yourself:
"If I reach the same node again, do I really need
to process all of its neighbors again?"
```

The AI doesn't immediately reveal the implementation.

---

### User

```text
Okay, give me level 2.
```

### AI

```text
Mark a node as visited when you decide to process it
through the BFS traversal.

This prevents the same node from being added repeatedly
to the queue.
```

---

### User

```text
Give me the full solution.
```

### AI

Now the mentor can provide:

```text
Approach
    ↓
Algorithm
    ↓
Java Code
    ↓
Time Complexity
    ↓
Space Complexity
```

---

# 📊 Response Types

The structured response system can support different response categories:

| Type          | Purpose                                       |
| ------------- | --------------------------------------------- |
| `hint`        | Small guidance without revealing the solution |
| `explanation` | Explain a DSA concept                         |
| `debugging`   | Analyze user's existing code                  |
| `solution`    | Provide complete solution                     |
| `complexity`  | Explain time and space complexity             |
| `concept`     | Teach a specific DSA concept                  |

This allows the frontend to render different response types appropriately.

---

# 🧠 Core Learning Loop

```text
┌───────────────┐
│ Attempt Problem│
└───────┬───────┘
        ↓
┌───────────────┐
│ Get Stuck     │
└───────┬───────┘
        ↓
┌───────────────┐
│ Ask AI Mentor │
└───────┬───────┘
        ↓
┌───────────────┐
│ Choose Hint   │
│ Level         │
└───────┬───────┘
        ↓
┌───────────────┐
│ Think & Try   │
│ Again         │
└───────┬───────┘
        ↓
     Solved?
      /   \
    No     Yes
    │       │
    ↓       ▼
More Help  Learn
    │
    └──────→
```

---

# 🚧 Future Improvements

Potential improvements include:

* [ ] User authentication
* [ ] User profiles
* [ ] DSA progress tracking
* [ ] Problem history
* [ ] Hint history
* [ ] Difficulty tracking
* [ ] Topic-wise progress
* [ ] AI-generated practice problems
* [ ] Personalized problem recommendations
* [ ] Code execution
* [ ] Test-case execution
* [ ] Code complexity analysis
* [ ] Multiple programming languages
* [ ] Voice-based DSA mentoring
* [ ] AI-generated learning paths
* [ ] Spaced-repetition based revision
* [ ] Daily DSA challenges
* [ ] Leaderboards
* [ ] Analytics dashboard
* [ ] Multiple LLM provider support

---

# 🌟 What Makes DSA Mentor Different?

Traditional solution platforms often follow:

```text
Problem
   ↓
Solution
   ↓
Done
```

DSA Mentor follows:

```text
Problem
   ↓
Attempt
   ↓
Stuck
   ↓
Understand the mistake
   ↓
Hint
   ↓
Think
   ↓
Try
   ↓
Stronger hint
   ↓
Try again
   ↓
Solution
   ↓
Understand
```

The objective is not to make solving problems **faster by giving answers**.

The objective is to make the learner **better at solving problems independently**.

---

# 🤝 Contributing

Contributions are welcome.

If you want to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test your changes.
5. Commit your changes.
6. Push the branch.
7. Open a Pull Request.

Example:

```bash
git checkout -b feature/new-feature

git add .

git commit -m "feat: add new DSA mentor feature"

git push origin feature/new-feature
```

---

# 🐛 Issues & Feedback

Found a bug?

Have an idea for improving the mentoring experience?

Open an issue and describe:

* What happened
* What you expected
* Steps to reproduce
* Relevant screenshots or logs

---

# 📜 License

This project is intended for educational and development purposes.

Add your preferred license here when the project is ready for open-source distribution.

---

# 💡 Project Vision

DSA Mentor aims to become an **AI-powered learning environment for problem solving**, where AI doesn't replace the learner's thinking — it strengthens it.

```text
          ┌───────────────────────┐
          │       Learn DSA       │
          └───────────┬───────────┘
                      │
                      ▼
          ┌───────────────────────┐
          │    Attempt Problems   │
          └───────────┬───────────┘
                      │
                      ▼
          ┌───────────────────────┐
          │    Get Stuck          │
          └───────────┬───────────┘
                      │
                      ▼
          ┌───────────────────────┐
          │      Ask AI Mentor    │
          └───────────┬───────────┘
                      │
                      ▼
          ┌───────────────────────┐
          │  Get Just Enough Help │
          └───────────┬───────────┘
                      │
                      ▼
          ┌───────────────────────┐
          │     Think & Solve     │
          └───────────┬───────────┘
                      │
                      ▼
          ┌───────────────────────┐
          │   Become Better at    │
          │    Problem Solving    │
          └───────────────────────┘
```

## ⭐ If you find this project useful

Give the repository a star and share your feedback.

**Build. Think. Get stuck. Learn. Solve. 🚀**
