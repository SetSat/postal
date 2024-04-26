function fetchPINCodeDetails(pincode) {
    const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;
  
    return new Promise((resolve, reject) => {
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error fetching PINCODE data: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(`Error fetching PINCODE data: ${error.message}`);
        });
    });
  }
  
  const fetchBtn = document.getElementById('fetch-btn');
  fetchBtn.addEventListener('click', () => {
    const pincodeInput = document.getElementById('pincode');
    const pincode = pincodeInput.value.trim();
    if (pincode.length === 0) {
      alert('Please enter a PINCODE.');
      return;
    }
  
    fetchPINCodeDetails(pincode)
      .then(data => {
        const pincodeInfo = document.getElementById('pincode-info');
        pincodeInfo.innerHTML = '';
  
        if (data && Array.isArray(data) && data.length > 0) {
          const details = data[0];
          const state = details.PostOffice[0].State;
          const district = details.PostOffice[0].District;
          const region = details.PostOffice[0].Region;
  
          const stateElement = document.createElement('p');
          stateElement.textContent = `State: ${state}`;
  
          const districtElement = document.createElement('p');
          districtElement.textContent = `District: ${district}`;
  
          const regionElement = document.createElement('p');
          regionElement.textContent = `Region: ${region}`;
  
          pincodeInfo.appendChild(stateElement);
          pincodeInfo.appendChild(districtElement);
          pincodeInfo.appendChild(regionElement);
        } else {
          const errorMessage = document.createElement('p');
          errorMessage.textContent = 'No data found for the given PINCODE.';
          pincodeInfo.appendChild(errorMessage);
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        alert('Failed to fetch data. Please try again.');
      });
  });
  