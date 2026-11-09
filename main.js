const fetchBtn = document.getElementById("fetchBtn");
const userCount = document.getElementById("userCount");
const usersContainer = document.getElementById("usersContainer");

async function getUsers() {
  const count = userCount.value;
  usersContainer.innerHTML = "<p class='text-center text-gray-500'>Loading...</p>";

  try {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await response.json();

    usersContainer.innerHTML = "";

    data.results.forEach((user) => {
      const userCard = `
        <div class="flex items-center gap-4 p-4 border border-gray-200 rounded">
          <img 
            src="${user.picture.large}" 
            alt="Profile Picture" 
            class="w-16 h-16 rounded-full border"
          />
          <div class="text-sm text-gray-700">
            <h2 class="text-base font-bold text-gray-900">
              ${user.name.first} ${user.name.last}
            </h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>
          </div>
        </div>
      `;
      usersContainer.innerHTML += userCard;
    });
  } catch (error) {
    usersContainer.innerHTML = "<p class='text-center text-red-500'>Failed to load users.</p>";
  }
}

fetchBtn.addEventListener("click", getUsers);