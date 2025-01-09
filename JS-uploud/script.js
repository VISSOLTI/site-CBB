// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBYYp97Ao7-_DxxGmTu7NPRDC2FZdJFLDg",
    authDomain: "cbb-cadastro.firebaseapp.com",
    databaseURL: "https://cbb-cadastro-default-rtdb.firebaseio.com",
    projectId: "cbb-cadastro",
    storageBucket: "cbb-cadastro.firebasestorage.app",
    messagingSenderId: "826130353391",
    appId: "1:826130353391:web:3d1ca11f63fc22afc8df1a"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Select all buttons with the class "upload"
  const uploadButtons = document.querySelectorAll('.upload');
  
  // Hidden file input element (consider adding an id for clarity)
  const hiddenBtn = document.getElementById('hiddenFileInput') || document.getElementsByClassName('hidden-upload-btn')[0];
  
  // Progress bar and percentage elements
  const progress = document.getElementsByClassName('progress')[0];
  const percent = document.getElementsByClassName('percent')[0];
  
  // Pause, resume, and cancel buttons
  const pause = document.getElementsByClassName('pause')[0];
  const resume = document.getElementsByClassName('resume')[0];
  const cancel = document.getElementsByClassName('cancel')[0];
  
  // Create an array to store selected files
  let selectedFiles = [];
  
  // Function to handle file selection and upload for each button
  function handleFileSelection(button) {
    button.onclick = function () {
      hiddenBtn.click();
    };
  
    hiddenBtn.onchange = function () {
      // Get all selected files
      selectedFiles = Array.from(hiddenBtn.files);
  
      // Upload each file in the selectedFiles array
      for (const file of selectedFiles) {
        // Use the current file object within the loop
        const name = file.name.split('.').shift() + Math.floor(Math.random() * 10) + 10 + '.' + file.name.split('.').pop();
        const type = file.type.split('/')[0];
        const path = type + '/' + name;
  
        // Now upload the current file
        const storageRef = firebase.storage().ref(path);
        const uploadTask = storageRef.put(file);
  
        // ... (rest of the upload logic for the current file)
  
        // Add event listener to update progress bar for each uploadTask
        uploadTask.on('state_changed',
          (snapshot) => {
            const progressValue = String((snapshot.bytesTransferred / snapshot.totalBytes) * 100).split('.')[0];
            progress.style.width = progressValue + '%';
            percent.innerHTML = progressValue + '%';

             // Check if upload is complete (100%)
            if (progressValue === '100') {
                // Set a timeout to reset the progress bar after 2 seconds
                setTimeout(() => {
                progress.style.width = '0%';
                percent.innerHTML = '0%';
                }, 3000);
            }
          },
          (error) => {
            console.error(error); // Handle errors
          },
          () => {
          
           percent.innerHTML = '100% concluído';
           
          }
        );
      }
    };
  }
  
  // Attach the file selection function to each upload button
  uploadButtons.forEach(handleFileSelection);
  
  // Pause, resume, and cancel functionality (assuming uploadTask is defined within the loop)
  pause.onclick = function () {
    if (uploadTask) { // Check if uploadTask exists before pausing
      uploadTask.pause();
      resume.style.display = 'inline-block';
      pause.style.display = 'none';
    }
  };
  
  resume.onclick = function () {
    if (uploadTask) { // Check if uploadTask exists before resuming
      uploadTask.resume();
      resume.style.display = 'none';
      pause.style.display = 'inline-block';
    }
  };
  
  cancel.onclick = function () {
    if (uploadTask) { // Check if uploadTask exists before canceling
      uploadTask.cancel();
      progress.style.width = '0%';
      percent.innerHTML = '0%';
    }
  };