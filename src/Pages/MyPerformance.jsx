import React, { useState, useEffect } from 'react';
import { VictoryPie, VictoryChart, VictoryBar, VictoryAxis } from 'victory';

const MyPerformance = ({ studentId }) => {
  const [marks, setMarks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [fields, setFields] = useState([]);

  const fetchMarks = async () => {
    try {
      const response = await fetch(`http://localhost:5000/marks`);
      const data = await response.json();
      setMarks(data);
    } catch (error) {
      console.error('Error fetching marks:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch(`http://localhost:5000/subjects`);
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchFields = async () => {
    try {
      const response = await fetch(`http://localhost:5000/fields`);
      const data = await response.json();
      setFields(data);
    } catch (error) {
      console.error('Error fetching fields:', error);
    }
  };

  useEffect(() => {
    fetchMarks();
    fetchSubjects();
    fetchFields();
    const intervalId = setInterval(() => {
      fetchMarks();
      fetchSubjects();
      fetchFields();
    }, 5000); // Fetch data every 5 seconds
    return () => clearInterval(intervalId); // Clean up the interval
  }, [studentId]);

 // Data for VictoryPie
 const pieData = marks.map(mark => ({
  x: subjects.find(subject => subject._id === mark.subject_id)?.subject_name || 'Unknown',
  y: mark.marks
}));

// Data for VictoryBar
const barData = subjects.map(subject => ({
  x: fields.find(field => field._id === subject.field_id)?.field_name || 'Unknown',
  y: 1,
  label: subject.subject_name
}));

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Performance</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Subject-wise Marks</h4>
              <VictoryPie
                data={pieData}
                colorScale={['#FF6384', '#36A2EB', '#FFCE56']}
                animate={{ duration: 2000 }}
                style={{
                  labels: { fontSize: 12, fill: '#555' }
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Subject-wise Marks List</h4>
              <ul className="list-group">
                {marks.map((mark, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {subjects.find(subject => subject._id === mark.subject_id)?.subject_name || 'Unknown'}
                    <span className="badge bg-primary rounded-pill">{mark.marks}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Study Streams & Subjects</h4>
              <VictoryChart domainPadding={20}>
                <VictoryAxis
                  tickValues={fields.map(field => field._id)}
                  tickFormat={fields.map(field => field.field_name)}
                  style={{
                    tickLabels: { fontSize: 10, padding: 5 }
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  tickFormat={(x) => `${x}`}
                  style={{
                    tickLabels: { fontSize: 10, padding: 5 }
                  }}
                />
                <VictoryBar
                  data={subjects.map(subject => ({ x: subject.field_id, y: 1, label: subject.subject_name }))}
                  x="x"
                  y="y"
                  labels={({ datum }) => datum.label}
                  style={{
                    data: { fill: "#4CAF50" },
                    labels: { fontSize: 10, fill: "#333" },
                  }}
                />
              </VictoryChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPerformance;
