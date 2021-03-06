import React from 'react'
import { Route } from 'react-router-dom'

import UninstallModal from 'ducks/apps/components/UninstallModal'

export const UninstallRoute = ({ getApp, isFetching, parent, redirectTo }) => (
  <Route
    path={`/${parent}/:appSlug/uninstall`}
    render={({ match }) => {
      if (isFetching) return null
      const parentPath = `/${parent}`
      const app = getApp(match)
      if (!app) return redirectTo(parentPath)
      const appPath = `${parentPath}/${app.slug}`
      return (
        <UninstallModal
          appSlug={app.slug}
          dismissAction={() => redirectTo(appPath)}
          onNotInstalled={() => redirectTo(appPath)}
          onSuccess={() => redirectTo(appPath)}
        />
      )
    }}
  />
)

export default UninstallRoute
