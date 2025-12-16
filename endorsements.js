// Supabase Configuration
// Replace these with your actual Supabase project credentials
const SUPABASE_URL = 'https://rbxzhqzrwqzlavdmnxhi.supabase.co'; // e.g., 'https://xxxxx.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_s8qbXbjlbFXvT30P1H3e0w_wl6GzC-r';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Load endorsements on page load
async function loadEndorsements() {
    try {
        // Fetch all endorsements, ordered by creation date
        const { data, error } = await supabase
            .from('endorsements')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Clear existing endorsements (except the form)
        const endorsementsList = document.getElementById('endorsementsList');
        endorsementsList.innerHTML = '';

        // Display each endorsement
        data.forEach(endorsement => {
            const endorsementCard = createEndorsementCard(
                endorsement.name,
                endorsement.occupation,
                endorsement.organization
            );
            endorsementsList.appendChild(endorsementCard);
        });

    } catch (error) {
        console.error('Error loading endorsements:', error);
    }
}

// Create endorsement card element
function createEndorsementCard(name, occupation, organization) {
    let titleDetails = '';
    if (occupation && organization) {
        titleDetails = `${occupation}, ${organization}`;
    } else if (occupation) {
        titleDetails = occupation;
    } else if (organization) {
        titleDetails = organization;
    }

    const endorsementCard = document.createElement('div');
    endorsementCard.className = 'endorsement-card';
    endorsementCard.innerHTML = `
        <div class="endorsement-content">
            <h3 class="endorser-name">${name}</h3>
            ${titleDetails ? `<p class="endorser-title">${titleDetails}</p>` : ''}
        </div>
    `;
    return endorsementCard;
}

// Handle form submission
document.getElementById('endorsementForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const organization = document.getElementById('organization').value;
    const occupation = document.getElementById('occupation').value;

    // Disable submit button to prevent double submission
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
        // Insert endorsement into Supabase
        const { data, error } = await supabase
            .from('endorsements')
            .insert([
                {
                    name: name,
                    occupation: occupation || null,
                    organization: organization || null
                }
            ]);

        if (error) throw error;

        // Reload endorsements to show the new one
        await loadEndorsements();

        // Reset form
        this.reset();

        // Show success message
        alert('Thank you for your endorsement!');
    } catch (error) {
        console.error('Error submitting endorsement:', error);
        alert('There was an error submitting your endorsement. Please try again.');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Endorsement';
    }
});

// Load endorsements when page loads
document.addEventListener('DOMContentLoaded', loadEndorsements);