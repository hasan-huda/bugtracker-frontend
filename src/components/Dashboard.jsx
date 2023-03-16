import React from 'react';
import AdminDashboard from './AdminDashboard';
import DeveloperDashboard from './DeveloperDashboard';
import SubmitterDashboard from './SubmitterDashboard';

const Dashboard = ({ logged }) => {
  const { role } = logged;

  let dashboardComponent;
  switch (role) {
    case 'Admin':
    case 'Project Manager':
      dashboardComponent = <AdminDashboard logged={logged} />;
      break;
    case 'Developer':
      dashboardComponent = <DeveloperDashboard />;
      break;
    case 'Submitter':
      dashboardComponent = <SubmitterDashboard />;
      break;
    default:
      dashboardComponent = <div>Unknown Role</div>;
      break;
  }

  return (
    <>
      {dashboardComponent}
    </>
  );
};

export default Dashboard;