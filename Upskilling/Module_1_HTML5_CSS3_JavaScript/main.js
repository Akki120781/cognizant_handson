console.log("Welcome to the Community Portal");

const defaultEventName = "Community Wellness Camp";
const defaultEventDate = "2026-07-12";
let availableSeats = 25;
let formIsDirty = false;

class CommunityEvent {
    constructor(id, name, category, city, date, seats, fee) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.city = city;
        this.date = date;
        this.seats = seats;
        this.fee = fee;
    }
}

CommunityEvent.prototype.checkAvailability = function checkAvailability() {
    return new Date(this.date) >= new Date() && this.seats > 0;
};

const events = [
    new CommunityEvent(1, "Music in the Park", "Culture", "Chennai", "2026-07-05", 12, 100),
    new CommunityEvent(2, "Workshop on Baking", "Education", "Chennai", "2026-07-08", 8, 50),
    new CommunityEvent(3, "Community Wellness Camp", "Health", "Chennai", "2026-07-12", 20, 0),
    new CommunityEvent(4, "Junior Football League", "Sports", "Chennai", "2026-08-02", 0, 75),
    new CommunityEvent(5, "Past Heritage Walk", "Culture", "Chennai", "2024-01-20", 10, 60)
];

function addEvent(eventList, eventItem) {
    eventList.push(eventItem);
    return eventList;
}

function createCategoryRegistrationCounter() {
    const totals = {};
    return function register(category) {
        totals[category] = (totals[category] || 0) + 1;
        return totals[category];
    };
}

const trackCategoryRegistration = createCategoryRegistrationCounter();

function filterEventsByCategory(eventList, category = "all", callback = (eventItem) => eventItem) {
    const clonedEvents = [...eventList];
    return clonedEvents
        .filter((eventItem) => category === "all" || eventItem.category === category)
        .map(callback);
}

function registerUser(eventId) {
    try {
        const selectedEvent = events.find((eventItem) => eventItem.id === eventId);
        if (!selectedEvent) {
            throw new Error("Event not found.");
        }
        if (!selectedEvent.checkAvailability()) {
            throw new Error("No seats available for this event.");
        }

        selectedEvent.seats--;
        availableSeats--;
        const categoryCount = trackCategoryRegistration(selectedEvent.category);
        document.querySelector("#registrationSummary").textContent =
            `${selectedEvent.name} registration confirmed. Category registrations: ${categoryCount}.`;
        renderEvents();
    } catch (error) {
        document.querySelector("#registrationSummary").textContent = error.message;
    }
}

function cancelRegistration(eventId) {
    const selectedEvent = events.find((eventItem) => eventItem.id === eventId);
    if (selectedEvent) {
        selectedEvent.seats++;
        availableSeats++;
        renderEvents();
    }
}

function formatEventCard(eventItem) {
    const { id, name, category, city, date, seats, fee } = eventItem;
    return { id, name, category, city, date, seats, fee };
}

function renderEvents() {
    const eventList = document.querySelector("#eventList");
    const category = document.querySelector("#categoryFilter").value;
    const searchTerm = document.querySelector("#searchBox").value.toLowerCase();
    eventList.innerHTML = "";

    const visibleEvents = filterEventsByCategory(events, category, formatEventCard)
        .filter((eventItem) => eventItem.name.toLowerCase().includes(searchTerm))
        .filter((eventItem) => events.find((source) => source.id === eventItem.id).checkAvailability());

    visibleEvents.forEach((eventItem) => {
        const card = document.createElement("article");
        card.className = "eventCard";
        card.innerHTML = `
            <h3>${eventItem.name}</h3>
            <p>${eventItem.category} event in ${eventItem.city}</p>
            <p>Date: ${eventItem.date}</p>
            <p>Seats: ${eventItem.seats}</p>
            <p>Fee: ${eventItem.fee === 0 ? "Free" : "INR " + eventItem.fee}</p>
            <button type="button" data-register="${eventItem.id}">Register</button>
            <button type="button" data-cancel="${eventItem.id}">Cancel</button>
        `;
        eventList.appendChild(card);
    });

    if (visibleEvents.length === 0) {
        eventList.textContent = "No available events match the selected filters.";
    }

    console.log(`Default event: ${defaultEventName} on ${defaultEventDate}. Seats left: ${availableSeats}`);
    console.log(Object.entries(events[0]));
}

function validatePhone() {
    const phone = document.querySelector("#phone").value.trim();
    const phoneError = document.querySelector("#phoneError");
    phoneError.textContent = phone && !/^[0-9]{10}$/.test(phone) ? "Enter a valid 10 digit phone number." : "";
}

function showEventFee() {
    const eventType = document.querySelector("#eventType");
    const selectedOption = eventType.options[eventType.selectedIndex];
    const fee = selectedOption.dataset.fee;
    document.querySelector("#eventFee").textContent = fee ? `Selected event fee: INR ${fee}` : "";
    if (eventType.value) {
        localStorage.setItem("preferredEventType", eventType.value);
        sessionStorage.setItem("lastEventType", eventType.value);
    }
}

function showClickConfirmation() {
    console.log("Register button clicked.");
}

function countCharacters() {
    const length = document.querySelector("#message").value.length;
    document.querySelector("#charCount").textContent = `${length} characters`;
}

function enlargeImage(image) {
    image.classList.toggle("enlarged");
}

function showVideoReadyMessage() {
    document.querySelector("#videoMessage").textContent = "Video ready to play";
}

function loadSavedPreferences() {
    const savedEventType = localStorage.getItem("preferredEventType");
    if (savedEventType) {
        document.querySelector("#eventType").value = savedEventType;
        showEventFee();
    }
}

function findNearbyEvents() {
    const output = document.querySelector("#locationOutput");
    if (!navigator.geolocation) {
        output.textContent = "Geolocation is not supported by this browser.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            output.textContent = `Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        },
        (error) => {
            output.textContent = `Unable to fetch location: ${error.message}`;
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
}

function fetchEventsWithThen() {
    return fetch("data/events.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Could not load event data.");
            }
            return response.json();
        })
        .catch((error) => {
            console.warn(error.message);
            return [];
        });
}

async function fetchEventsWithAsyncAwait() {
    const spinner = document.querySelector("#loadingSpinner");
    spinner.classList.remove("hidden");
    try {
        const response = await fetch("data/events.json");
        if (!response.ok) {
            throw new Error("Could not load event data.");
        }
        return await response.json();
    } catch (error) {
        console.warn(error.message);
        return [];
    } finally {
        spinner.classList.add("hidden");
    }
}

function postRegistration(userData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            })
                .then((response) => resolve(response.ok))
                .catch(() => resolve(false));
        }, 600);
    });
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    console.log("Preparing registration payload.");

    const form = event.target;
    const { name, email, eventType } = form.elements;
    const formError = document.querySelector("#formError");
    const output = document.querySelector("#confirmationOutput");

    if (!name.value.trim() || !email.value.trim() || !eventType.value) {
        formError.textContent = "Name, email, and event type are required.";
        return;
    }

    formError.textContent = "";
    const payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        eventType: eventType.value
    };

    console.log("Submitting registration", payload);
    postRegistration(payload).then((success) => {
        output.textContent = success
            ? `Thank you, ${payload.name}. Your registration is received.`
            : "Registration could not be submitted. Please try again.";
        formIsDirty = false;
    });
}

window.addEventListener("load", () => {
    alert("Community portal loaded successfully");
    addEvent(events, new CommunityEvent(6, "Public Library Reading Hour", "Education", "Chennai", "2026-08-12", 18, 0));
    renderEvents();
    loadSavedPreferences();
    fetchEventsWithThen().then((remoteEvents) => console.log("Fetched with then/catch", remoteEvents));
    fetchEventsWithAsyncAwait().then((remoteEvents) => console.log("Fetched with async/await", remoteEvents));
});

window.addEventListener("beforeunload", (event) => {
    if (formIsDirty) {
        event.preventDefault();
        event.returnValue = "";
    }
});

document.querySelector("#registrationForm").addEventListener("input", () => {
    formIsDirty = true;
});

document.querySelector("#registrationForm").addEventListener("submit", handleRegistrationSubmit);
document.querySelector("#categoryFilter").addEventListener("change", renderEvents);
document.querySelector("#searchBox").addEventListener("keydown", () => setTimeout(renderEvents, 0));
document.querySelector("#findNearbyBtn").addEventListener("click", findNearbyEvents);
document.querySelector("#clearPreferences").addEventListener("click", () => {
    localStorage.clear();
    sessionStorage.clear();
    document.querySelector("#eventType").value = "";
    document.querySelector("#eventFee").textContent = "";
});

document.querySelector("#eventList").addEventListener("click", (event) => {
    const registerId = event.target.dataset.register;
    const cancelId = event.target.dataset.cancel;
    if (registerId) {
        registerUser(Number(registerId));
    }
    if (cancelId) {
        cancelRegistration(Number(cancelId));
    }
});

$("#registerBtn").on("click", function () {
    $(".eventCard").fadeOut(100).fadeIn(100);
});

console.log("Framework note: React or Vue can help organize larger portals into reusable components.");
