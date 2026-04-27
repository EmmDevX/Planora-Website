import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";



function Dashboard() {
  
// Helper to get saved user email
const getSavedUserEmail = () => {
  const savedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  return savedUser.email || "";
};
  const [notes, setNotes] = useState(() => {
    const email = getSavedUserEmail();
  return JSON.parse(localStorage.getItem(`notes_${email}`) || "[]");
});

const colors = [
  "#fef3c7",
  "#dbeafe",
  "#dcfce7",
  "#fae8ff",
  "#ffe4e6",
  "#e0f2fe",
  "#ede9fe",
  "#fef9c3",
  "#f0fdf4",
  "#0000FF"

];

function getDailyIndex(email) {
  const today = new Date().toDateString();

  let hash = 0;
  const input = email + today;

  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }

  return Math.abs(hash);
}
const [bgColor, setBgColor] = useState("#fef3c7");

useEffect(() => {
  const email = getSavedUserEmail();

  const index = getDailyIndex(email) % quotes.length;

  
}, []);

const [quote, setQuote] = useState("");


const quotes = [
  "Small steps every day lead to big results.",
  "Consistency beats intensity—show up daily.",
  "Progress, not perfection.",
  "Discipline creates freedom.",
  "Focus on one task, finish it well.",
  "Your future is built by what you do today.",
  "Success comes from daily habits, not motivation.",
  "Do it even when you don’t feel like it.",
  "Stay patient. Stay consistent. Stay focused.",
  "Great things are built quietly over time.",
  "Growth begins at the end of your comfort zone.",
  "Every expert was once a beginner.",
  "Small improvements every day lead to massive results.",
  "Mistakes are proof you are trying.",
  "Keep going. You’re closer than you think.",
  "Progress is better than perfection.",
  "Don’t stop when you’re tired—stop when you’re done.",
  "You become what you repeatedly do.",
  "Struggles build strength.",
  "The best time to start was yesterday. The next best is now."
];

function getDailyQuote(email) {
  const today = new Date().toDateString();

  // combine email + date so each user gets different result
  let hash = 0;
  const input = email + today;

  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % quotes.length;
  return quotes[index];
}

useEffect(() => {
  const email = getSavedUserEmail();
  const today = new Date().toDateString();

  const savedDate = localStorage.getItem(`quoteDate_${email}`);
  const savedQuote = localStorage.getItem(`quote_${email}`);

  if (savedDate === today && savedQuote) {
    setQuote(savedQuote);
  } else {
    const newQuote = getDailyQuote(email);

    localStorage.setItem(`quoteDate_${email}`, today);
    localStorage.setItem(`quote_${email}`, newQuote);

    setQuote(newQuote);
  }
}, []);
const [showAddNoteModal, setShowAddNoteModal] = useState(false);

const [newNote, setNewNote] = useState({
  title: "",
  content: "",
  pdf: null
});
const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const daysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const startDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};
const prevMonth = () => {
  if (currentMonth === 0) {
    setCurrentMonth(11);
    setCurrentYear(prev => prev - 1);
  } else {
    setCurrentMonth(prev => prev - 1);
  }
};

const nextMonth = () => {
  if (currentMonth === 11) {
    setCurrentMonth(0);
    setCurrentYear(prev => prev + 1);
  } else {
    setCurrentMonth(prev => prev + 1);
  }
};
const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
const saveNotes = (newNotes) => {
  setNotes(newNotes);
  const email = currentUser.email || "";
  localStorage.setItem(`notes_${email}`, JSON.stringify(newNotes));
};
console.log(newNote.pdf);
const handlePdfUpload = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  if (file.type !== "application/pdf") {
    alert("Only PDF files allowed");
    return;
  }

  const reader = new FileReader();

  reader.onloadend = () => {
    // VERY IMPORTANT: ensure it's stored
    setNewNote(prev => ({
      ...prev,
      pdf: reader.result
    }));
  };

  reader.readAsDataURL(file);
};
const handleAddNote = () => {
  if (!newNote.title) return;

  const note = {
    id: Date.now(),
    ...newNote
  };

  saveNotes([...notes, note]);

  setNewNote({ title: "", content: "", pdf: null });
  setShowAddNoteModal(false);
};
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem("currentUser") || "{}"));
  const [events, setEvents] = useState(() => {
    const email = getSavedUserEmail();
    return JSON.parse(localStorage.getItem(`events_${email}`) || "[]");
  });
  const [timetable, setTimetable] = useState(() => {
    const email = getSavedUserEmail();
    return JSON.parse(localStorage.getItem(`timetable_${email}`) || "[]");
  });
  const [tasks, setTasks] = useState(() => {
    const email = getSavedUserEmail();
    return JSON.parse(localStorage.getItem(`tasks_${email}`) || "[]");
  });
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", type: "event" });
  const [newClass, setNewClass] = useState({ subject: "", day: "Monday", time: "", duration: "", room: "" });
  const [newTask, setNewTask] = useState({ title: "", subject: "", due: "", completed: false });
  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editConfirmPassword, setEditConfirmPassword] = useState("");
  const [settingsMessage, setSettingsMessage] = useState("");
  const navigate = useNavigate();

  // Save data to localStorage
  const saveEvents = (newEvents) => {
    setEvents(newEvents);
    const userEmail = currentUser.email || "";
    localStorage.setItem(`events_${userEmail}`, JSON.stringify(newEvents));
  };

  const saveTimetable = (newTimetable) => {
    setTimetable(newTimetable);
    const userEmail = currentUser.email || "";
    localStorage.setItem(`timetable_${userEmail}`, JSON.stringify(newTimetable));
  };

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    const userEmail = currentUser.email || "";
    localStorage.setItem(`tasks_${userEmail}`, JSON.stringify(newTasks));
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    const event = {
      id: Date.now(),
      ...newEvent
    };
    saveEvents([...events, event]);
    setNewEvent({ title: "", date: "", type: "event" });
    setShowAddEventModal(false);
  };

  const handleAddClass = () => {
    if (!newClass.subject || !newClass.time) return;
    const classItem = {
      id: Date.now(),
      ...newClass
    };
    saveTimetable([...timetable, classItem]);
    setNewClass({ subject: "", day: "Monday", time: "", duration: "", Venue: "" });
    setShowAddClassModal(false);
  };

  const handleAddTask = () => {
    if (!newTask.title) return;
    const task = {
      id: Date.now(),
      ...newTask
    };
    saveTasks([...tasks, task]);
    setNewTask({ title: "", subject: "", due: "", completed: false });
    setShowAddTaskModal(false);
  };

  const toggleTaskComplete = (taskId) => {
    const updatedTasks = tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    saveTasks(updatedTasks);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...currentUser, profilePic: reader.result };
        setCurrentUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        
        // Also update in users array
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
          users[userIndex].profilePic = reader.result;
          localStorage.setItem("users", JSON.stringify(users));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    // Validate name change
    if (editName && editName.trim() !== currentUser.name) {
      const updatedUser = { ...currentUser, name: editName.trim() };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      
      // Update in users array
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex(u => u.email === currentUser.email);
      if (userIndex !== -1) {
        users[userIndex].name = editName.trim();
        localStorage.setItem("users", JSON.stringify(users));
      }
    }

    // Validate password change
    if (editPassword) {
      if (editPassword !== editConfirmPassword) {
        setSettingsMessage("Passwords do not match!");
        setTimeout(() => setSettingsMessage(""), 3000);
        return;
      }
      if (editPassword.length < 6) {
        setSettingsMessage("Password must be at least 6 characters");
        setTimeout(() => setSettingsMessage(""), 3000);
        return;
      }
      
      // Update password in users array
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex(u => u.email === currentUser.email);
      if (userIndex !== -1) {
        users[userIndex].password = editPassword;
        localStorage.setItem("users", JSON.stringify(users));
      }
    }

    setSettingsMessage("Settings saved successfully!");
    setEditName("");
    setEditPassword("");
    setEditConfirmPassword("");
    setTimeout(() => setSettingsMessage(""), 3000);
  };

  const timeSlots = ["08.00AM", "09:00 AM","10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const getClassForSlot = (day, time) => {
    return timetable.find(t => t.day === day && t.time === time);
  };

  const getUpcomingClasses = () => {
    return timetable.slice(0, 3);
  };

  const upcomingClasses = getUpcomingClasses();
  const upcomingEvents = events.slice(0, 3);
  const recentTasks = tasks.slice(0, 3);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="dashboard-content">
            <div className="welcome-section">
              <h1>Welcome back, {currentUser.name || "Student"}! 👋</h1>
              <p>Here's what's happening with your studies today.</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-info">
                  <span className="stat-value">{new Set(timetable.map(t => t.subject)).size || 0}</span>
                  <span className="stat-label"> Subjects</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <span className="stat-value">{tasks.filter(t => t.completed).length}</span>
                  <span className="stat-label"> Tasks Done</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-info">
                  <span className="stat-value">{events.length}</span>
                  <span className="stat-label"> Upcoming</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏰</div>
                <div className="stat-info">
                  <span className="stat-value">{timetable.length * 1.5}h</span>
                  <span className="stat-label"> Study Time</span>
                </div>
              </div>
            </div>

            <div className="main-grid">
              <div className="section-card classes-section">
                <div className="section-header">
                  <h2>Today's Classes</h2>
                  <a href="#timetable" onClick={() => setActiveTab("timetable")} className="view-all">View All</a>
                </div>
                <div className="classes-list">
                  {upcomingClasses.length > 0 ? upcomingClasses.map((classItem) => (
                    <div key={classItem.id} className="class-item">
                      <div className="class-info">
                        <h3>{classItem.subject}</h3>
                        <p>{classItem.room || "TBA"}</p>
                      </div>
                      <div className="class-time">
                        <span className="time">{classItem.time}</span>
                        <span className="duration">{classItem.duration || "1h"}</span>
                      </div>
                    </div>
                  )) : (
                    <div className="empty-state">No classes added yet. <button onClick={() => { setActiveTab("timetable"); setShowAddClassModal(true); }}>Add your first class</button></div>
                  )}
                </div>
              </div>

              <div className="section-card tasks-section">
                <div className="section-header">
                  <h2>Recent Tasks</h2>
                  <a href="#tasks" onClick={() => setActiveTab("tasks")} className="view-all">View All</a>
                </div>
                <div className="tasks-list">
                  {recentTasks.length > 0 ? recentTasks.map((task) => (
                    <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                      <input type="checkbox" checked={task.completed} onChange={() => toggleTaskComplete(task.id)} />
                      <div className="task-info">
                        <span className="task-title">{task.title}</span>
                        <span className="task-subject">{task.subject} • Due {task.due}</span>
                      </div>
                    </div>
                  )) : (
                    <div className="empty-state">No tasks yet. <button onClick={() => { setActiveTab("tasks"); setShowAddTaskModal(true); }}>Add a task</button></div>
                  )}
                </div>
              </div>

              <div className="section-card events-section">
                <div className="section-header">
                  <h2>Upcoming Events</h2>
                  <a href="#events" onClick={() => setActiveTab("events")} className="view-all">View All</a>
                </div>
                <div className="events-list">
                  {upcomingEvents.length > 0 ? upcomingEvents.map((event) => (
                    <div key={event.id} className={`event-item ${event.type}`}>
                      <div className="event-date">{event.date}</div>
                      <div className="event-info">
                        <span className="event-title">{event.title}</span>
                        <span className="event-type">{event.type}</span>
                      </div>
                    </div>
                  )) : (
                    <div className="empty-state">No events yet. <button onClick={() => { setActiveTab("events"); setShowAddEventModal(true); }}>Add an event</button></div>
                  )}
                </div>
                
              </div>
                <div className="section-card events-section">
                <div className="section-header">
                  <h2>Study Tips for the Day</h2>
               </div>
              <div className="quote"  style={{
    backgroundColor: bgColor,
    padding: "20px",
    borderRadius: "12px",
    transition: "0.3s ease"
  }}>
               <q>{quote}</q>
              </div>
                
              </div>
              
            </div>
          </div>
        );

      case "calendar":
  { const totalDays = daysInMonth(currentMonth, currentYear);
  const startDay = startDayOfMonth(currentMonth, currentYear);

  return (
    <div className="calendar-page">
      <h2>Calendar</h2>

      <div className="calendar-container">
        <div className="calendar-header">
          <button className="cal-nav" onClick={prevMonth}>←</button>

          <h3>{months[currentMonth]} {currentYear}</h3>

          <button className="cal-nav" onClick={nextMonth}>→</button>
        </div>

        <div className="calendar-grid">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
            <div key={d} className="cal-day-header">{d}</div>
          ))}

          {/* Empty slots before month starts */}
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="cal-day other-month"></div>
          ))}

          {/* Days */}
          {Array.from({ length: totalDays }, (_, i) => {
            const day = i + 1;

            const hasEvent = events.some(e =>
              e.date?.includes(`${day}`)
            );

            return (
              <div key={day} className="cal-day">
                <span className="day-number">{day}</span>
                {hasEvent && <div className="event-dot"></div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ); }

      case "timetable":
        return (
          <div className="timetable-page">
            <div className="page-header">
              <h2>Weekly Timetable</h2>
              <button className="add-btn" onClick={() => setShowAddClassModal(true)}>+ Add Class</button>
            </div>
            <div className="timetable-container">
              <table className="timetable">
                <thead>
                  <tr>
                    <th>Time</th>
                    {days.map(day => <th key={day}>{day}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(time => (
                    <tr key={time}>
                      <td className="time-slot">{time}</td>
                      {days.map(day => {
                        const classItem = getClassForSlot(day, time);
                        return (
                          <td key={day} className={classItem ? `class-slot ${classItem.subject.toLowerCase().includes('math') ? 'math' : classItem.subject.toLowerCase().includes('phys') || classItem.subject.toLowerCase().includes('science') ? 'science' : classItem.subject.toLowerCase().includes('eng') || classItem.subject.toLowerCase().includes('art') ? 'arts' : ''}` : 'empty-slot'}>
                            {classItem ? (
                              <>
                                {classItem.subject}<br /><span>{classItem.room || ""}</span>
                              </>
                            ) : ""}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "events":
        return (
          <div className="events-page">
            <div className="page-header">
              <h2>Events & Assignments</h2>
              <button className="add-btn" onClick={() => setShowAddEventModal(true)}>+ Add Event</button>
            </div>
            <div className="events-container">
              <div className="events-filter">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Exams</button>
                <button className="filter-btn">Assignments</button>
                <button className="filter-btn">Events</button>
              </div>
              <div className="events-list-full">
                {events.length > 0 ? events.map((event) => (
                  <div key={event.id} className={`event-card ${event.type}`}>
                    <div className="event-card-date">
                      <span className="month">{event.date.split(" ")[0]}</span>
                      <span className="day">{event.date.split(" ")[1]}</span>
                    </div>
                    <div className="event-card-info">
                      <h3>{event.title}</h3>
                      <span className="event-tag">{event.type}</span>
                    </div>
                    <button className="edit-btn" onClick={() => {
                      const updated = events.filter(e => e.id !== event.id);
                      saveEvents(updated);
                    }}>Delete</button>
                  </div>
                )) : (
                  <div className="empty-state">No events yet. Click "Add Event" to create one.</div>
                )}
              </div>
            </div>
          </div>
        );

      case "tasks":
        return (
          <div className="tasks-page">
            <div className="page-header">
              <h2>Tasks & Assignments</h2>
              <button className="add-btn" onClick={() => setShowAddTaskModal(true)}>+ Add Task</button>
            </div>
            <div className="tasks-container">
              <div className="tasks-filter">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Pending</button>
                <button className="filter-btn">Completed</button>
              </div>
              <div className="tasks-list-full">
                {tasks.length > 0 ? tasks.map((task) => (
                  <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                    <input type="checkbox" checked={task.completed} onChange={() => toggleTaskComplete(task.id)} />
                    <div className="task-card-info">
                      <h3>{task.title}</h3>
                      <span>{task.subject} • Due {task.due}</span>
                    </div>
                    <span className={`status-badge ${task.completed ? 'done' : 'pending'}`}>
                      {task.completed ? 'Done' : 'Pending'}
                    </span>
                    <button className="edit-btn" onClick={() => {
                      const updated = tasks.filter(t => t.id !== task.id);
                      saveTasks(updated);
                    }}>Delete</button>
                  </div>
                )) : (
                  <div className="empty-state">No tasks yet. Click "Add Task" to create one.</div>
                )}
              </div>
            </div>
          </div>
        );

    case "notes":
  return (
    <div className="notes-page">
      <div className="page-header">
        <h2>My Notes</h2>
        <button className="add-btn" onClick={() => setShowAddNoteModal(true)}>
          + New Note
        </button>
      </div>

      <div className="notes-grid">
        {notes.length > 0 ? notes.map(note => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>

            {note.pdf && (
              <button
  className="pdf-link"
  onClick={() => window.open(note.pdf, "_blank")}
>
  📄 View PDF
</button>
            )}
          </div>
        )) : (
          <div className="empty-state">No notes yet. Add one!</div>
        )}
      </div>
    </div>
  );

      case "settings":
        return (
          <div className="settings-page">
            <h2>Settings</h2>
            <div className="settings-container">
              {settingsMessage && <div className="settings-message">{settingsMessage}</div>}
              <div className="settings-section">
                <h3>Profile Picture</h3>
                <div className="profile-pic-section">
                  <div className="profile-pic-preview">
                    {currentUser.profilePic ? (
                      <img src={currentUser.profilePic} alt="Profile" className="profile-pic" />
                    ) : (
                      <div className="profile-pic-placeholder">
                        {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "?"}
                      </div>
                    )}
                  </div>
                  <label className="upload-btn">
                    Upload Photo
                    <input type="file" accept="image/*" onChange={handleProfilePicChange} hidden />
                  </label>
                </div>
              </div>
              <div className="settings-section">
                <h3>Personal Information</h3>
                <div className="setting-item">
                  <label>Name</label>
                  <input type="text" value={editName || currentUser.name || ""} onChange={(e) => setEditName(e.target.value)} placeholder="Enter new name" />
                </div>
                <div className="setting-item">
                  <label>Email</label>
                  <input type="email" defaultValue={currentUser.email || ""} readOnly className="readonly" />
                </div>
              </div>
              <div className="settings-section">
                <h3>Change Password</h3>
                <div className="setting-item">
                  <label>New Password</label>
                  <input type="password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} placeholder="Enter new password" />
                </div>
                <div className="setting-item">
                  <label>Confirm Password</label>
                  <input type="password" value={editConfirmPassword} onChange={(e) => setEditConfirmPassword(e.target.value)} placeholder="Confirm new password" />
                </div>
              </div>
              <div className="settings-section">
                <h3>Preferences</h3>
                <div className="setting-item">
                  <label>Theme</label>
                  <select>
                    <option>Light</option>
                    <option>Dark</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Notifications</label>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
              <button className="save-btn" onClick={handleSaveSettings}>Save Changes</button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src="images/favicon.png" alt="Planora" className="sidebar-logo-img" />
            {sidebarOpen && <span className="logo-text">Planora</span>}
          </div>

           {/* Close button (mobile only) */}
  <button 
    className="close-sidebar-btn"
    onClick={() => setSidebarOpen(false)}
  >
    ✕
  </button>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="nav-icon"><img src="images/home.png" alt="Overview" /></span>
            {sidebarOpen && <span>Overview</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            <span className="nav-icon"><img src="images/calendar.svg" alt="Calendar" /></span>
            {sidebarOpen && <span>Calendar</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'timetable' ? 'active' : ''}`}
            onClick={() => setActiveTab('timetable')}
          >
            <span className="nav-icon"><img src="images/clock.svg" alt="Timetable" /></span>
            {sidebarOpen && <span>Timetable</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <span className="nav-icon"><img src="images/events.png" alt="Events" /></span>
            {sidebarOpen && <span>Events</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <span className="nav-icon"><img src="images/check-square.svg" alt="Tasks" /></span>
            {sidebarOpen && <span>Tasks</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            <span className="nav-icon"><img src="images/note.png" alt="Notes" /></span>
            {sidebarOpen && <span>Notes</span>}
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span className="nav-icon"><img src="images/tool.svg" alt="Settings" /></span>
            {sidebarOpen && <span>Settings</span>}
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon"><img src="images/power.svg" alt="Logout" /></span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-bar">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <div className="top-bar-right">
            <div className="user-info">
              <span className="user-name">{currentUser.name || "Student"}</span>
              <span className="user-email">{currentUser.email || "student@planora.com"}</span>
            </div>
            <div className="user-avatar" onClick={() => setActiveTab('settings')} style={{ cursor: 'pointer' }}>
              {currentUser.profilePic ? (
                <img src={currentUser.profilePic} alt={currentUser.name} className="avatar-img" />
              ) : (
                currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "S"
              )}
            </div>
          </div>
        </header>

        <div className="content-area">
          {renderContent()}
        </div>
      </main>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="modal-overlay" onClick={() => setShowAddEventModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Add New Event</h3>
            <div className="form-group">
              <label>Title</label>
              <input type="text" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} placeholder="Event title" />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="text" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} placeholder="e.g., Apr 28" />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select value={newEvent.type} onChange={e => setNewEvent({...newEvent, type: e.target.value})}>
                <option value="event">Event</option>
                <option value="exam">Exam</option>
                <option value="assignment">Assignment</option>
              </select>
            </div>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowAddEventModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleAddEvent}>Add Event</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Class Modal */}
      {showAddClassModal && (
        <div className="modal-overlay" onClick={() => setShowAddClassModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Add New Class</h3>
            <div className="form-group">
              <label>Course</label>
              <input type="text" value={newClass.subject} onChange={e => setNewClass({...newClass, subject: e.target.value})} placeholder="Course name" />
            </div>
            <div className="form-group">
              <label>Day</label>
              <select value={newClass.day} onChange={e => setNewClass({...newClass, day: e.target.value})}>
                {days.map(day => <option key={day} value={day}>{day}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Time</label>
              <select value={newClass.time} onChange={e => setNewClass({...newClass, time: e.target.value})}>
                <option value="">Select time</option>
                {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input type="text" value={newClass.duration} onChange={e => setNewClass({...newClass, duration: e.target.value})} placeholder="e.g., 1h 30m" />
            </div>
            <div className="form-group">
              <label>Venue</label>
              <input type="text" value={newClass.room} onChange={e => setNewClass({...newClass, room: e.target.value})} placeholder="Lecture Venue" />
            </div>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowAddClassModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleAddClass}>Add Class</button>
            </div>
          </div>
        </div>
      )}

      {showAddNoteModal && (
  <div className="modal-overlay" onClick={() => setShowAddNoteModal(false)}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <h3>Add Note</h3>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={newNote.title}
          onChange={(e) => setNewNote({...newNote, title: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          value={newNote.content}
          onChange={(e) => setNewNote({...newNote, content: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Upload PDF</label>
        <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
      </div>

      <div className="modal-buttons">
        <button className="cancel-btn" onClick={() => setShowAddNoteModal(false)}>
          Cancel
        </button>
        <button className="save-btn" onClick={handleAddNote}>
          Save Note
        </button>
      </div>
    </div>
  </div>
)}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="modal-overlay" onClick={() => setShowAddTaskModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Add New Task</h3>
            <div className="form-group">
              <label>Task Title</label>
              <input type="text" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} placeholder="Task title" />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" value={newTask.subject} onChange={e => setNewTask({...newTask, subject: e.target.value})} placeholder="Subject name" />
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input type="text" value={newTask.due} onChange={e => setNewTask({...newTask, due: e.target.value})} placeholder="e.g., Tomorrow or Apr 30" />
            </div>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowAddTaskModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleAddTask}>Add Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;