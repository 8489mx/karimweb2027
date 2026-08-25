const fs = require('fs');

let path = 'src/components/ui/ContactModal.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldSubmit = `  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call to email service (e.g. Nodemailer, Formspree)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('success');
    
    // Reset form after a few seconds
    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 3000);
  };`;

const newSubmit = `  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "8ea420ab-cf9f-4c28-9347-e108a4f3e9fa",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', email: '', message: '' });
          onClose();
        }, 3000);
      } else {
        console.error("Form submission failed", result);
        setStatus('idle');
      }
    } catch (error) {
       console.error("Error submitting form", error);
       setStatus('idle');
    }
  };`;

content = content.replace(oldSubmit, newSubmit);

fs.writeFileSync(path, content);
