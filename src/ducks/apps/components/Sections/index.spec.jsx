'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { tMock } from 'jestLib/I18n'
import { Sections } from 'ducks/apps/components/Sections/Sections'

import mockApps from 'ducks/apps/_mockApps'

describe('AppsSection component', () => {
  it('should be rendered correctly with apps list, subtitle and onAppClick', () => {
    const mockOnAppClick = jest.fn()
    const component = shallow(
      <Sections
        t={tMock}
        lang="en"
        subtitle="Test Apps"
        apps={mockApps}
        allApps={mockApps}
        onAppClick={mockOnAppClick}
        error={null}
        location={{ search: '' }}
      />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should render correctly render message if error provided', () => {
    const mockOnAppClick = jest.fn()
    const component = shallow(
      <Sections
        t={tMock}
        lang="en"
        subtitle="Test Apps"
        apps={mockApps}
        allApps={mockApps}
        onAppClick={mockOnAppClick}
        error={new Error('This is a test error')}
        location={{ search: '' }}
      />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should not render dropdown filter on mobile if nav=false flag provided', () => {
    const mockOnAppClick = jest.fn()
    const component = shallow(
      <Sections
        t={tMock}
        lang="en"
        subtitle="Test Apps"
        apps={mockApps}
        allApps={mockApps}
        onAppClick={mockOnAppClick}
        breakpoints={{ isMobile: true }}
        hasNav={false}
      />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should not render dropdown filter on tablet if nav=false flag provided', () => {
    const mockOnAppClick = jest.fn()
    const component = shallow(
      <Sections
        t={tMock}
        lang="en"
        subtitle="Test Apps"
        apps={mockApps}
        allApps={mockApps}
        onAppClick={mockOnAppClick}
        breakpoints={{ isTablet: true }}
        hasNav={false}
      />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should render dropdown filter on mobile if no nav=false flag provided', () => {
    const mockOnAppClick = jest.fn()
    const component = shallow(
      <Sections
        t={tMock}
        lang="en"
        subtitle="Test Apps"
        apps={mockApps}
        allApps={mockApps}
        onAppClick={mockOnAppClick}
        breakpoints={{ isMobile: true }}
      />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should render dropdown filter on tablet if no nav=false flag provided', () => {
    const mockOnAppClick = jest.fn()
    const component = shallow(
      <Sections
        t={tMock}
        lang="en"
        subtitle="Test Apps"
        apps={mockApps}
        allApps={mockApps}
        onAppClick={mockOnAppClick}
        breakpoints={{ isTablet: true }}
      />
    ).getElement()
    expect(component).toMatchSnapshot()
  })
})
