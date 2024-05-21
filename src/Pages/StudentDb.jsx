import React, { useState, useEffect } from 'react';

const StudentDb = () => {
  const [fields, setFields] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);
  const [signups, setSignups] = useState([]);
 
  const fieldDummyData = {
     field_name :"Engineering"
  };

  const subjectDummyData = {
    subject_name : 'History  (Field: Arts)'
  };

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await fetch('http://localhost:5000/fields');
        if (!response.ok) {
          throw new Error('Failed to fetch fields');
        }
        const data = await response.json();
        setFields(data);
      } catch (error) {
        console.error('Error fetching fields:', error);
        setFields([fieldDummyData]); // Setting fields to an array with the dummy data
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/subjects');
        if (!response.ok) {
          throw new Error('Failed to fetch subjects');
        }
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setSubjects(subjectDummyData); // Setting subjects to the dummy data
      }
    };

    const fetchMarks = async () => {
      const response = await fetch('http://localhost:5000/marks');
      const data = await response.json();
      setMarks(data);
    };

    const fetchSignups = async () => {
      const response = await fetch('http://localhost:5000/signups');
      const data = await response.json();
      setSignups(data);
    };

    fetchFields();
    fetchSubjects();
    fetchMarks();
    fetchSignups();
  }, []);

  const handleDelete = async (id, type) => {
    try {
      await fetch(`http://localhost:5000/${type}/${id}`, {
        method: 'DELETE'
      });
      if (type === 'fields') setFields(fields.filter(field => field._id !== id));
      if (type === 'subjects') setSubjects(subjects.filter(subject => subject._id !== id));
      if (type === 'marks') setMarks(marks.filter(mark => mark._id !== id));
      if (type === 'signups') setSignups(signups.filter(signup => signup._id !== id));
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  const handleUpdate = (id, type) => {
    // Logic for updating a specific item
    // You can navigate to a different page or open a modal for updating the item
    console.log(`Update ${type} with id:`, id);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Student Database</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Fields/Streams</h5>
          <ul className="list-group">
            {fields.map(field => (
              <li key={field._id} className="list-group-item d-flex justify-content-between align-items-center">
                {field.field_name}
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleUpdate(field._id, 'fields')}>Update</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(field._id, 'fields')}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Subjects List</h5>
          <ul className="list-group">
            {subjects.map(subject => (
              <li key={subject._id} className="list-group-item d-flex justify-content-between align-items-center">
                {subject.subject_name} (Field: {fields.find(field => field._id === subject.field_id)?.field_name || 'Unknown'})
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleUpdate(subject._id, 'subjects')}>Update</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(subject._id, 'subjects')}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Marks</h5>
          <ul className="list-group">
            {marks.map(mark => (
              <li key={mark._id} className="list-group-item d-flex justify-content-between align-items-center">
                Student ID: {mark.student_id}, Subject ID: {mark.subject_id}, Marks: {mark.marks}
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleUpdate(mark._id, 'marks')}>Update</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(mark._id, 'marks')}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Enrolled Students</h5>
          <ul className="list-group">
            {signups.map(signup => (
              <li key={signup._id} className="list-group-item d-flex justify-content-between align-items-center">
                {signup.name} (Email: {signup.email}, Enrollment Year: {signup.enrollmentYear}, Field: {fields.find(field => field._id === signup.field_id)?.field_name || 'Unknown'})
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleUpdate(signup._id, 'signups')}>Update</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(signup._id, 'signups')}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDb;
