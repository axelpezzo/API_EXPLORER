const React = require('react');
const PropTypes = require('prop-types');

const extensions = require('../../packages/oas-extensions');

const withSpecFetching = require('./SpecFetcher');

const ApiExplorer = require('../../packages/api-explorer/src');
const Logs = require('../../packages/api-logs/index');

require('../swagger-files/types.json');
require('../swagger-files/response-schemas.json');
require('../../packages/api-explorer/api-explorer.css');
require('../../packages/api-logs/main.css');

//import { Github } from 'react-feather';
var Github = require('react-feather/dist/icons/github').default;
var Book = require('react-feather/dist/icons/book-open').default;


function Demo({ fetchSwagger, status, docs, oas, oauth }) {
  const lang = navigator.language.substring(0, 2) || 'en';

  return (
    <div>
      <div className="api-list-header">
        <div className="api-list-header-logo">
          <img src="https://open-hospital.org/oh20-developer-portal/public/assets/logo.svg" />
          <h5>API Portal</h5>
        </div>
        <div className="api-list-header-menu">
          <a href="https://open-hospital.org/oh20-developer-portal/" target="_blank" title="OH - Developer Portal"><Book /></a>
          <a href="https://github.com/informatici/openhospital" target="_blank" title="OH - GitHub"><Github /></a>
        </div>
      </div>
      {
        status.length === 0 && (
          <ApiExplorer
            docs={docs}
            oasFiles={{
              'api-setting': { ...extensions.defaults, ...oas },
            }}
            baseUrl={'/'}
            flags={{ correctnewlines: false }}
            appearance={{ referenceLayout: 'row' }}
            suggestedEdits
            oauth={false}
            variables={{
              user: { keys: [{ name: 'project1', apiKey: '123', user: 'user1', pass: 'pass1' }, { name: 'project2', apiKey: '456', user: 'user2', pass: 'pass2' }] },
              defaults: [],
            }}
            fallbackUrl={window.origin}
            glossaryTerms={[{ term: 'apiKey', definition: 'This is a definition' }]}
            stripSlash={false}
            defaultOpen={false}
          />
        )
      }
    </div>
  );
}

Demo.propTypes = {
  oauth: PropTypes.bool,
  oas: PropTypes.shape({}).isRequired,
  docs: PropTypes.arrayOf(PropTypes.shape).isRequired,
  status: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchSwagger: PropTypes.func.isRequired,
};

Demo.defaultProps = {
  oauth: false,
};

module.exports = withSpecFetching(Demo);
