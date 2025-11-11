import React, { useState, ChangeEvent, FormEvent } from 'react';

export interface CandidateFormData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  workingExperience: string;
  cv: File | null;
}

interface CandidateFormProps {
  onSubmit: (data: CandidateFormData) => void;
}

const initialErrors = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  education: '',
  workingExperience: '',
  cv: '',
};

const CandidateForm: React.FC<CandidateFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState<CandidateFormData>({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    workingExperience: '',
    cv: null,
  });
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState<{[K in keyof CandidateFormData]?: boolean}>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');

  const validate = (field: keyof CandidateFormData, value: any): string => {
    switch (field) {
      case 'name':
      case 'lastName':
        if (!value.trim()) return 'Required.';
        if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Only letters, spaces, apostrophes, and hyphens.';
        return '';
      case 'email':
        if (!value.trim()) return 'Required.';
        if (!/^\S+@\S+\.\S+$/.test(value)) return 'Invalid email format.';
        return '';
      case 'phone':
        if (!value.trim()) return 'Required.';
        if (!/^\+?[0-9\s-]{7,}$/.test(value)) return 'Invalid phone number.';
        return '';
      case 'address':
        if (!value.trim()) return 'Required.';
        return '';
      case 'education':
      case 'workingExperience':
        if (!value.trim()) return 'Required.';
        return '';
      case 'cv':
        if (value) {
          const ext = value.name.split('.').pop()?.toLowerCase();
          if (!['pdf', 'doc', 'docx'].includes(ext || '')) return 'Only PDF or DOCX.';
          if (value.size > 3 * 1024 * 1024) return 'Max file size is 3MB.';
        }
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name as keyof CandidateFormData, value) }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, cv: file }));
    setTouched((prev) => ({ ...prev, cv: true }));
    setErrors((prev) => ({ ...prev, cv: validate('cv', file) }));
  };

  const handleRemoveFile = () => {
    setForm((prev) => ({ ...prev, cv: null }));
    setErrors((prev) => ({ ...prev, cv: '' }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name as keyof CandidateFormData, form[name as keyof CandidateFormData]) }));
  };

  const isFormValid = () => {
    return Object.keys(form).every((key) => {
      const error = validate(key as keyof CandidateFormData, form[key as keyof CandidateFormData]);
      return !error;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Validate all fields before submit
    const newErrors: typeof initialErrors = { ...initialErrors };
    (Object.keys(form) as Array<keyof CandidateFormData>).forEach((key) => {
      newErrors[key] = validate(key, form[key]);
    });
    setErrors(newErrors);
    setTouched((prev) => {
      const allTouched = { ...prev };
      (Object.keys(form) as Array<keyof CandidateFormData>).forEach((key) => {
        allTouched[key] = true;
      });
      return allTouched;
    });
    if (Object.values(newErrors).every((err) => !err)) {
      setSubmitting(true);
      setApiError('');
      setApiSuccess('');
      try {
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('lastName', form.lastName);
        formData.append('email', form.email);
        formData.append('phone', form.phone);
        formData.append('address', form.address);
        formData.append('education', form.education);
        formData.append('workingExperience', form.workingExperience);
        if (form.cv) formData.append('cv', form.cv);
        const response = await fetch('/candidates', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          const errorData = await response.json();
          setApiError(errorData.message || 'Submission failed.');
        } else {
          setApiSuccess('Candidate added successfully!');
          setForm({
            name: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            education: '',
            workingExperience: '',
            cv: null,
          });
          setTouched({});
          setErrors(initialErrors);
          onSubmit({
            name: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            education: '',
            workingExperience: '',
            cv: null,
          });
        }
      } catch (err) {
        setApiError('Network or server error.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Add Candidate Form" noValidate>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" value={form.name} onChange={handleChange} onBlur={handleBlur} required aria-describedby="name-error" />
      {touched.name && errors.name && <div className="error-tooltip" id="name-error">{errors.name}</div>}

      <label htmlFor="lastName">Last Name</label>
      <input id="lastName" name="lastName" type="text" value={form.lastName} onChange={handleChange} onBlur={handleBlur} required aria-describedby="lastName-error" />
      {touched.lastName && errors.lastName && <div className="error-tooltip" id="lastName-error">{errors.lastName}</div>}

      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" value={form.email} onChange={handleChange} onBlur={handleBlur} required aria-describedby="email-error" />
      {touched.email && errors.email && <div className="error-tooltip" id="email-error">{errors.email}</div>}

      <label htmlFor="phone">Phone</label>
      <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} onBlur={handleBlur} required aria-describedby="phone-error" />
      {touched.phone && errors.phone && <div className="error-tooltip" id="phone-error">{errors.phone}</div>}

      <label htmlFor="address">Address</label>
      <input id="address" name="address" type="text" value={form.address} onChange={handleChange} onBlur={handleBlur} required aria-describedby="address-error" />
      {touched.address && errors.address && <div className="error-tooltip" id="address-error">{errors.address}</div>}

      <label htmlFor="education">Education</label>
      <textarea id="education" name="education" value={form.education} onChange={handleChange} onBlur={handleBlur} required aria-describedby="education-error" />
      {touched.education && errors.education && <div className="error-tooltip" id="education-error">{errors.education}</div>}

      <label htmlFor="workingExperience">Working Experience</label>
      <textarea id="workingExperience" name="workingExperience" value={form.workingExperience} onChange={handleChange} onBlur={handleBlur} required aria-describedby="workingExperience-error" />
      {touched.workingExperience && errors.workingExperience && <div className="error-tooltip" id="workingExperience-error">{errors.workingExperience}</div>}

      <label htmlFor="cv">CV (PDF or DOCX)</label>
      <input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} aria-describedby="cv-error" />
      {form.cv && (
        <div>
          <span>{form.cv.name}</span>
          <button type="button" onClick={handleRemoveFile} aria-label="Remove CV">Remove</button>
        </div>
      )}
      {touched.cv && errors.cv && <div className="error-tooltip" id="cv-error">{errors.cv}</div>}

      {apiError && <div className="error-tooltip" role="alert">{apiError}</div>}
      {apiSuccess && <div className="success-tooltip" role="status">{apiSuccess}</div>}
      <button type="submit" disabled={!isFormValid() || submitting}>Submit</button>
    </form>
  );
};

export default CandidateForm;
