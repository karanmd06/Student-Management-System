import React, { useEffect, useState } from 'react';
import api from '../services/api';


export default function Students(){
const [students, setStudents] = useState([]);
useEffect(() => { fetchStudents(); }, []);
const fetchStudents = async () => {
const res = await api.get('/students');
setStudents(res.data);
};
const del = async (id) => { await api.delete(`/students/${id}`); fetchStudents(); };
return (
<div>
<h2>Students</h2>
<button onClick={fetchStudents}>Refresh</button>
<ul>
{students.map(s => (
<li key={s._id}>{s.firstName} {s.lastName} — {s.class}
<button onClick={() => del(s._id)}>Delete</button>
</li>
))}
</ul>
</div>
);
}