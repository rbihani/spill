// Get DOM elements
const truthButton = document.querySelector('.truth-button');
const dareButton = document.querySelector('.dare-button');
const hitMeButton = document.querySelector('.hit-me-button');
const title = document.querySelector('.title');
const subtitle = document.querySelector('.subtitle');

// Function to generate AI prompt
async function generateAIPrompt(mode) {
    const prompt = `You are an AI helping a group of friends play Truth or Dare. Generate **one** original, funny, and creative ${mode.toUpperCase()} question that hasn't been used before. Keep it under 25 words.`;
    
    try {
        // For now, we'll simulate an API call with a timeout
        // In a real implementation, you would replace this with your actual API endpoint
        return new Promise((resolve) => {
            setTimeout(() => {
                // Fallback prompts if API is not available
                const fallbackPrompts = {
                    truth: [
                        "What's the most embarrassing thing you've ever done in public?",
                        "What's your biggest fear and why?",
                        "What's the worst lie you've ever told?",
                        "What's your most embarrassing childhood memory?",
                        "What's your biggest regret?",
                        "What's the most embarrassing thing in your search history?",
                        "What's your biggest insecurity?",
                        "What's your biggest pet peeve?",
                        "What's your biggest guilty pleasure?",
                        "What's the most embarrassing thing you've worn?"
                    ],
                    dare: [
                        "Let the group post something on your social media",
                        "Call your crush and confess your feelings",
                        "Let someone in the group text your mom",
                        "Dance to a song of the group's choice",
                        "Let the group take a photo of you and post it",
                        "Call a random number and sing happy birthday",
                        "Let someone in the group go through your phone for 2 minutes",
                        "Do your best impression of someone in the group",
                        "Let the group choose your profile picture for a week",
                        "Call your ex and apologize for something"
                    ]
                };
                
                const prompts = fallbackPrompts[mode];
                const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
                resolve(randomPrompt);
            }, 500); // Simulate API delay
        });
        
        // Uncomment and modify this section when you have an actual API endpoint:
        /*
        const response = await fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 50,
                temperature: 0.8
            })
        });
        
        const data = await response.json();
        return data.choices[0].text.trim();
        */
        
    } catch (error) {
        console.error('Error generating prompt:', error);
        // Return a fallback prompt if API fails
        return mode === 'truth' 
            ? "What's the most embarrassing thing that happened to you in school?" 
            : "Let the group post something on your social media";
    }
}

// Function to show prompt with animation
function showPrompt(prompt, type) {
    // Keep the original header and subtitle unchanged
    title.textContent = 'Out of questions?';
    subtitle.textContent = 'Spill makes sure the game never dies.';
    
    // Create or update the prompt display
    let promptContainer = document.querySelector('.prompt-container');
    if (!promptContainer) {
        promptContainer = document.createElement('div');
        promptContainer.className = 'prompt-container';
        document.querySelector('.frame-12').appendChild(promptContainer);
    }
    
    // Update prompt container content
    promptContainer.innerHTML = `
        <div class="prompt-title">${type === 'truth' ? 'Truth' : 'Dare'}</div>
        <div class="prompt-text">${prompt}</div>
        <button class="another-button">
            <span class="button-text">another one.</span>
        </button>
    `;
    
    // Add animation
    promptContainer.style.opacity = '0';
    setTimeout(() => {
        promptContainer.style.transition = 'opacity 0.3s ease';
        promptContainer.style.opacity = '1';
    }, 100);
    
    // Add event listener to the new "another one" button
    const anotherButton = promptContainer.querySelector('.another-button');
    anotherButton.addEventListener('click', async () => {
        // Show loading state
        const promptText = promptContainer.querySelector('.prompt-text');
        promptText.textContent = `Generating new ${type}...`;
        promptText.style.opacity = '0.7';
        
        const newPrompt = await generateAIPrompt(type);
        promptText.textContent = newPrompt;
        promptText.style.opacity = '1';
        
        // Add click effect
        addClickEffect(anotherButton);
    });
    
    // Hide the original hit me button
    const hitMeButton = document.querySelector('.hit-me-button');
    hitMeButton.style.display = 'none';
}

// Function to reset to original state
function resetToOriginal() {
    title.textContent = 'Out of questions?';
    subtitle.textContent = 'Spill makes sure the game never dies.';
    
    // Remove prompt container if it exists
    const promptContainer = document.querySelector('.prompt-container');
    if (promptContainer) {
        promptContainer.remove();
    }
    
    // Show the original hit me button
    const hitMeButton = document.querySelector('.hit-me-button');
    hitMeButton.style.display = 'flex';
    hitMeButton.querySelector('.button-text').textContent = 'hit me with it.';
    
    // Add animation
    title.style.opacity = '0';
    subtitle.style.opacity = '0';
    
    setTimeout(() => {
        title.style.transition = 'opacity 0.3s ease';
        subtitle.style.transition = 'opacity 0.3s ease';
        title.style.opacity = '1';
        subtitle.style.opacity = '1';
    }, 100);
}

// Event listeners
truthButton.addEventListener('click', async () => {
    const truthPrompt = await generateAIPrompt('truth');
    showPrompt(truthPrompt, 'truth');
});

dareButton.addEventListener('click', async () => {
    const darePrompt = await generateAIPrompt('dare');
    showPrompt(darePrompt, 'dare');
});

hitMeButton.addEventListener('click', async () => {
    // If we're showing a prompt, generate a new one
    if (document.querySelector('.prompt-container')) {
        const promptContainer = document.querySelector('.prompt-container');
        const promptText = promptContainer.querySelector('.prompt-text');
        const promptTitle = promptContainer.querySelector('.prompt-title');
        const currentType = promptTitle.textContent.toLowerCase();
        
        // Show loading state
        promptText.textContent = `Generating new ${currentType}...`;
        promptText.style.opacity = '0.7';
        
        const newPrompt = await generateAIPrompt(currentType);
        promptText.textContent = newPrompt;
        promptText.style.opacity = '1';
    } else {
        // If we're in original state, generate a random truth or dare
        const randomType = Math.random() < 0.5 ? 'truth' : 'dare';
        const prompt = await generateAIPrompt(randomType);
        showPrompt(prompt, randomType);
    }
});

// Add some visual feedback for button clicks
function addClickEffect(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

truthButton.addEventListener('click', () => addClickEffect(truthButton));
dareButton.addEventListener('click', () => addClickEffect(dareButton));
hitMeButton.addEventListener('click', () => addClickEffect(hitMeButton)); 