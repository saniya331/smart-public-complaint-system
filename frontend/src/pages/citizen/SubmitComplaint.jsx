import { useNavigate } from "react-router-dom";
import useComplaints from "../../hooks/useComplaints";

function SubmitComplaint() {
  const navigate = useNavigate();
  const { addComplaint } = useComplaints();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newComplaint = addComplaint({
      category: formData.get("category"),
      title: formData.get("title"),
      district: formData.get("district"),
      mandal: formData.get("mandal"),
      description: formData.get("description"),
      landmark: formData.get("landmark"),
    });

    alert(
      `Complaint submitted successfully! Your complaint ID is ${newComplaint.id}`
    );

    navigate("/citizen/dashboard");
  }

  return (
    <main className="submit-page">
      <header className="submit-header">
        <p>Citizen Portal / My Complaints / New Complaint</p>

        <h1>Raise a complaint</h1>

        <span>
          Share the details. We will route it to the right department.
        </span>
      </header>

      <form className="complaint-form" onSubmit={handleSubmit}>
        <section className="form-section">
          <h2>What is the issue?</h2>

          <p>
            Select the correct category to help us assign it faster.
          </p>

          <div className="form-grid">
            <div>
              <label>Complaint category</label>

              <select name="category" required>
                <option value="">Select a category</option>
                <option>Electricity</option>
                <option>Sanitation</option>
                <option>Roads & Transport</option>
                <option>Water Supply</option>
                <option>Public Safety</option>
              </select>
            </div>

            <div>
              <label>Issue title</label>

              <input
                name="title"
                type="text"
                placeholder="Example: Streetlight not working"
                required
              />
            </div>
          </div>

          <label>Describe the issue</label>

          <textarea
            name="description"
            placeholder="Explain the problem clearly. Include useful details such as how long the issue has existed."
            required
          />
        </section>

        <section className="form-section">
          <h2>Where is the issue?</h2>

          <p>
            Give the location so the department can take action.
          </p>

          <div className="form-grid">
            <div>
              <label>District</label>

              <select name="district" required>
                <option value="">Select district</option>
                <option>Hyderabad</option>
                <option>Rangareddy</option>
                <option>Medchal-Malkajgiri</option>
              </select>
            </div>

            <div>
              <label>Mandal / Locality</label>

              <select name="mandal" required>
                <option value="">Select locality</option>
                <option>Miyapur</option>
                <option>Gachibowli</option>
                <option>Kukatpally</option>
              </select>
            </div>
          </div>

          <label>Exact location or nearby landmark</label>

          <input
            name="landmark"
            type="text"
            placeholder="Example: Near community library, 3rd cross road"
            required
          />
        </section>

        <section className="form-section">
          <h2>
            Upload supporting photo <small>(optional)</small>
          </h2>

          <label className="upload-box">
            <input
              type="file"
              accept="image/png, image/jpeg"
            />

            <strong>＋ Upload an image</strong>

            <span>
              JPG or PNG, maximum size 10 MB
            </span>
          </label>
        </section>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate("/citizen/dashboard")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-btn"
          >
            Submit Complaint
          </button>
        </div>
      </form>
    </main>
  );
}

export default SubmitComplaint;