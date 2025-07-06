```js
function createElementWithAttributes(tagName, attributes, textContent) {
    // Validate inputs
    if (
        typeof tagName !== "string" ||
        typeof textContent !== "string" ||
        !attributes ||
        typeof attributes !== "object"
    ) {
        return { error: "Invalid input" };
    }

    // Return the structured element object
    return {
        tagName,
        attributes,
        textContent,
    };
}

// Read input from stdin (JSON format) and output result
process.stdin.on("data", (input) => {
    try {
        const { tagName, attributes, textContent } = JSON.parse(input);
        const result = createElementWithAttributes(tagName, attributes, textContent);
        process.stdout.write(JSON.stringify(result)); // Using process.stdout.write
    } catch (error) {
        process.stdout.write(JSON.stringify({ error: "Invalid JSON input" }));
    }
});
```