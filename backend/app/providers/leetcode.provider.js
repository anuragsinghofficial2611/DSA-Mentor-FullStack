const LEETCODE_URL = "https://leetcode.com/graphql";


// ======================================================
// STEP 1: Find problem using problem number
// Example: 342
// Result: titleSlug = "power-of-four"
// ======================================================

const findProblemByNumber = async (problemNumber) => {
    const query = `
        query problemsetQuestionList {
            problemsetQuestionList(
                limit: 4000
                skip: 0
            ) {
                questions {
                    questionFrontendId
                    title
                    titleSlug
                    difficulty
                    paidOnly
                }
            }
        }
    `;
    const response = await fetch(LEETCODE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: query
        })
    });
    if (!response.ok) {
        throw new Error(
            `LeetCode problem list request failed: ${response.status}`
        );
    }

    const data = await response.json();
    // Check whether LeetCode returned an error
    if (data.errors) {
        console.error("LeetCode GraphQL errors:", data.errors);
        throw new Error(
            "LeetCode returned GraphQL errors"
        );
    }

    const questions = data?.data?.problemsetQuestionList?.questions;
    if (!questions) {
        throw new Error(
            "Could not find problem list from LeetCode"
        );
    }
    // Find requested problem
    const problem = questions.find(
        question =>
            Number(question.questionFrontendId) ===
            Number(problemNumber)
    );

    if (!problem) {
        throw new Error(
            `LeetCode problem ${problemNumber} not found`
        );
    }


    return problem;
};



// ======================================================
// STEP 2: Get complete problem details
// using titleSlug
//
// Example:
// power-of-four
// ======================================================

const getProblemDetails = async (titleSlug) => {

    const query = `
        query questionData($titleSlug: String!) {

            question(titleSlug: $titleSlug) {

                questionFrontendId

                title

                titleSlug

                difficulty

                content

                exampleTestcases

                hints

                topicTags {
                    name
                    slug
                }

                codeSnippets {
                    lang
                    langSlug
                    code
                }
            }
        }
    `;


    const response = await fetch(LEETCODE_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            query: query,

            variables: {
                titleSlug: titleSlug
            }

        })
    });


    if (!response.ok) {

        throw new Error(
            `LeetCode detail request failed: ${response.status}`
        );
    }


    const data = await response.json();


    if (data.errors) {

        console.error(
            "LeetCode GraphQL errors:",
            data.errors
        );

        throw new Error(
            "LeetCode returned GraphQL errors"
        );
    }


    const problem =
        data?.data?.question;


    if (!problem) {

        throw new Error(
            `Could not find details for ${titleSlug}`
        );
    }


    return problem;
};



// ======================================================
// MAIN FUNCTION
//
// This is what our Express route will call.
//
// Input:
// 342
//
// Process:
//
// 342
// ↓
// find problem
// ↓
// power-of-four
// ↓
// get details
// ↓
// return complete problem
// ======================================================

const getProblem = async (problemNumber) => {
    // STEP 1
    const basicProblem = await findProblemByNumber(problemNumber);
    console.log(
        "Problem found:",
        basicProblem.title
    );
    console.log(
        "Title slug:",
        basicProblem.titleSlug
    );
    // STEP 2
    const problem =
        await getProblemDetails(
            basicProblem.titleSlug
        );
    return problem;
};
module.exports = {
    getProblem
};