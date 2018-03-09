/**
 * Layout of all Dashboard Routes
 */

import React from 'react'

import { Route as ReactRoute } from 'react-router-dom'

import dashboardHOC from '../HOC/dashboardHOC'
import Dashboard from '../scenes/Dashboard'
import MainLayout from '../layouts/MainLayout'

const AdminDashboard = dashboardHOC(Dashboard, 'admin')
const UserDashboard = dashboardHOC(Dashboard, 'user')

function DashboardRoute () {
  return (
    <MainLayout>
      <ReactRoute exact path='/dashboard/admin' component={AdminDashboard} />
      <ReactRoute exact path='/dashboard/user/:userid' component={UserDashboard} />
    </MainLayout>
  )
}

export default DashboardRoute
