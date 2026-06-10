
  const hd=document.getElementById('hd');
  addEventListener('scroll',()=>hd.classList.toggle('scrolled',scrollY>30));
  

  const burger=document.getElementById('burger'),mm=document.getElementById('mm');
  burger.addEventListener('click',()=>mm.classList.toggle('open'));
  mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mm.classList.remove('open')));
  
 
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

 
  const form = document.getElementById('ledForm');
  const result = document.getElementById('formResult');
  const button = document.getElementById('submitBtn');
  const emailInput = document.getElementById('emailInput');

 
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
   
    if (!validateEmail(emailInput.value.trim())) {
      result.style.display = "block";
      result.style.color = "#d93838"; 
      result.textContent = "Please enter a valid email address (e.g., name@domain.com).";
      emailInput.focus();
      return; 
    }

    button.textContent = "Sending...";
    button.disabled = true;

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.style.display = "block";
    result.style.color = "var(--ink)";
    result.textContent = "Please wait...";

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.style.color = "var(--teal)";
                result.textContent = "Success! Your request has been sent. We'll be in touch within 24 hours.";
                form.reset(); 
            } else {
                console.log(response);
                result.style.color = "#d93838"; 
                result.textContent = json.message || "Something went wrong. Please try again.";
            }
        })
        .catch(error => {
            console.log(error);
            result.style.color = "#d93838";
            result.textContent = "Network error. Please try again later.";
        })
        .then(function() {
            button.textContent = "Send Request →";
            button.disabled = false;
            setTimeout(() => {
                result.style.display = "none";
            }, 6000);
        });
  });
