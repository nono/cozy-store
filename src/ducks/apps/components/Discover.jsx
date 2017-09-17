import React, { Component } from 'react'

import { Route } from 'react-router-dom'

import { translate } from 'cozy-ui/react/I18n'
import Spinner from 'cozy-ui/react/Spinner'

import SmallAppItem from '../../components/SmallAppItem'
import UninstallModal from './UninstallModal'
import { InstallModal } from '../currentAppVersion/Containers'

export class Discover extends Component {
  constructor (props, context) {
    super(props)
    props.fetchApps(context.lang)

    this.onAppClick = this.onAppClick.bind(this)
  }

  onAppClick (appSlug) {
    this.props.history.push(`/discover/${appSlug}/manage`)
  }

  render () {
    const { t, apps, isFetching } = this.props
    return (
      <div className='sto-discover'>
        <h2 className='sto-discover-title'>{t('discover.title')}</h2>
        <div className='sto-discover-get-started'>
          <h3 className='sto-discover-get-started-title'>
            {t('discover.get_started')}
          </h3>
          <div className='sto-discover-get-started-list'>
            {!isFetching && apps.map(app => {
              // don't display app installed but not in registry
              if (!app.isInRegistry) return null
              let version = app.version
              if (app.versions && Array.isArray(app.versions.stable)) {
                version = (app.versions.stable && app.versions.stable[app.versions.stable.length - 1])
              }
              return <SmallAppItem
                slug={app.slug}
                developer={app.developer || ''}
                editor={app.editor || ''}
                icon={app.icon}
                name={app.name}
                version={version}
                installed={app.installed}
                onClick={() => this.onAppClick(app.slug)}
              />
            })}
            {isFetching &&
              <Spinner
                size='xxlarge'
                loadingType='appsFetching'
                middle='true'
              />
            }
          </div>
        </div>
        <Route path='/discover/:appSlug/manage' render={({ match }) => {
          if (isFetching) return
          if (apps.length && match.params) {
            const app = apps.find(app => app.slug === match.params.appSlug)
            if (app.installed) {
              return <UninstallModal uninstallApp={this.props.uninstallApp} parent='/discover' error={this.props.actionError} app={app} match={match} />
            } else if (!app.installed) {
              return <InstallModal installApp={this.props.installApp} parent='/discover' error={this.props.actionError} app={app} match={match} />
            }
          }
        }} />
      </div>
    )
  }
}

export default translate()(Discover)