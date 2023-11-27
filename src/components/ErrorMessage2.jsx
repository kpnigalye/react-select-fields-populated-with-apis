import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants";

const ErrorMessage = () => {
  const [formData, setFormData] = useState({
    name: "",
    serviceTeam: "",
    code: "",
    description: "",
  });

  const [codeOptions, setCodeOptions] = useState([]);
  const [serviceTeams, setServiceTeams] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  const fetchCodeOptions = async () => {
    try {
      const response = await axios.get(API_URL.CODES);
      setCodeOptions(response.data);
    } catch (error) {
      console.error("Error fetching code options:", error);
    }
  };

  const fetchServiceTeams = async () => {
    try {
      const response = await axios.get(API_URL.TEAMS);
      setServiceTeams(response.data);
    } catch (error) {
      console.error("Error fetching type teams:", error);
    }
  };

  useEffect(() => {
    Promise.all([fetchCodeOptions(), fetchServiceTeams()])
      .then(() => setFormVisible(true))
      .catch((error) => console.error("Error fetching external APIs:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      {formVisible ? (
        <form onSubmit={handleSubmit}>
          <label>
            Error Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Service Team:
            <select
              name="type"
              value={formData.serviceTeam}
              onChange={handleChange}
            >
              <option value="">Service Team</option>
              {serviceTeams.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Code:
            <select name="code" value={formData.code} onChange={handleChange}>
              <option value="">Error Code</option>
              {codeOptions.map((code) => (
                <option key={code.id} value={code.value}>
                  {code.value}
                </option>
              ))}
            </select>
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Loading form...</p>
      )}
    </div>
  );
};

export default ErrorMessage;
