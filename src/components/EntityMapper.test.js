import EntityMapper from './EntityMapper';
import React from 'react';
import renderer from 'react-test-renderer';
import site from '../utils/site';
import waitForHnData from '../utils/waitForHnData';
import { mapper, asyncMapper } from '../utils/tests';

jest.mock('../utils/site', () => {
  return require('../utils/tests').mockSite();
});

jest.mock('util-deprecate', () => jest.fn(func => func));
console.log = console.warn = console.error = jest.fn(message => {
  throw new Error(message);
});

beforeEach(() => {
  site.getData.mockRestore();
});

describe('EntityMapper', async () => {
  test('with required props', async () => {
    const component = (
      <EntityMapper
        uuid={'unique-uuid'}
        mapper={mapper}
      />
    );

    expect(renderer.create(component).toJSON()).toMatchSnapshot();

    expect(
      renderer.create(await waitForHnData(component)).toJSON(),
    ).toMatchSnapshot();
  });

  test('non-existing entity', async () => {
    const component = (
      <EntityMapper
        uuid={'non-existing-entity'}
        mapper={mapper}
      />
    );

    expect(renderer.create(component).toJSON()).toMatchSnapshot();

    expect(
      renderer.create(await waitForHnData(component)).toJSON(),
    ).toMatchSnapshot();
  });

  test('with required props & asyncMapper', async () => {
    const component = (
      <EntityMapper
        uuid={'unique-uuid'}
        mapper={asyncMapper}
        asyncMapper
      />
    );

    expect(renderer.create(component).toJSON()).toMatchSnapshot();

    expect(
      renderer.create(await waitForHnData(component)).toJSON(),
    ).toMatchSnapshot();
  });

  test('with all props', async () => {
    const component = (
      <EntityMapper
        entityProps={{ testEntityProp: true }}
        uuid={'unique-uuid'}
        mapper={mapper}
      />
    );

    expect(renderer.create(component).toJSON()).toMatchSnapshot();

    expect(
      renderer.create(await waitForHnData(component)).toJSON(),
    ).toMatchSnapshot();
  });

  test('with all props & asyncMapper', async () => {
    const component = (
      <EntityMapper
        entityProps={{ testEntityProp: true }}
        uuid={'unique-uuid'}
        mapper={asyncMapper}
        asyncMapper
      />
    );

    expect(renderer.create(component).toJSON()).toMatchSnapshot();

    expect(
      renderer.create(await waitForHnData(component)).toJSON(),
    ).toMatchSnapshot();
  });
});
