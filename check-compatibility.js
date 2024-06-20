const prompt = require('prompt');

const schema = {
  properties: {
    compatibilityChecked: {
      description: 'Haben Sie die Abwärtskompatibilität durch Nutzung der Deprecation API sichergestellt? (ja/nein)',
      pattern: /^(ja|nein|Ja|Nein|JA|NEIN)$/,
      message: 'Bitte antworten Sie mit ja oder nein',
      required: true
    }
  }
};

prompt.start();

prompt.get(schema, function (err, result) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  if (result.compatibilityChecked.toLowerCase() === 'ja') {
    console.log('Abwärtskompatibilität bestätigt. Fahren Sie mit dem Build fort.');
    process.exit(0);
  } else {
    console.log('Bitte stellen Sie die Abwärtskompatibilität sicher, bevor Sie fortfahren. Nutzen Sie die WordPress Deprecation API, um Blöcke nahtlos für Nutzer zu updaten.');
    process.exit(1);
  }
});
