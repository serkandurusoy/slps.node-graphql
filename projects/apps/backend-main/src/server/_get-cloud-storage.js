// import path from 'path';
import googleCloudStorage from '@google-cloud/storage';

const getCloudStorage = () => {
  try {
    const gcs = googleCloudStorage({
      // TODO: we must secure this!
      // keyFilename: path.join(__dirname, '../../.google-cloud-storage-key.json'),
      // TODO: the way we're using credentials is undocumented. I found this by digging into the
      // google library's source code at https://github.com/googleapis/nodejs-common/blob/master/src/util.js#L585
      // which may change because it is not a public api
      credentials: {
        type: 'service_account',
        project_id: 'slps-stg-backend-main',
        private_key_id: 'fdddfddb8fc98ab4ebff998ff72a9b1db2a111d2',
        private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+eI5qgarMLy0U\npbopbCuJIBwX/3uETaGgtdG2HNp2tO3GQWVFnalrDb2xRzhDuCwlZYhA6v9+Gvqi\nKGVvtnyLjIq32hFeL5m/mOOlAwD2FbXCTsbKhltfqTSj7altoYSA3/l7wS2cYIWU\nXeEthMUdDdDGCtMS+jfQlDDcWYHKEklGyjT9Ltvln0rQAMQSaIi1kgIpoDBjdAzr\ng9LNnYSOYPZkDMewTgrbH03jfdq5cPk9zD6Fg9KZIqhZkyj3HJVVpk2cqxi38MPe\nNN0yoO7v5+LpihiykUy+2YViqZdJ7ZUmwPPscH/SbaTJMXjb8Ui689EbOg0x7+JX\nZ5yWj5rxAgMBAAECggEAW6niA/C2NUCI5fRh1Hh5tSrOSmBJ3aCMpa6Kp6VYH6Ow\nAGbNaYTYGSyKO0wmkDSMjkzAF1ngrhwmvS5Krsn4QyJWSed4z0aCK/pUp7970XIe\nQE4wDhw90ho4uqFwFdIS1gCz7HJJ1IWBE6dgbEsGn5ZcAEsKTIo9nTQMFac/tnJj\npKjfp2j+kd6PYZTbid4YnYqzHZ0wKqwRgWOOAY+bW/GM9cWZ/iw/DL5egt66Hyjj\nAnjau1XdS/KWPVdmq25Lmogrs/4j1igddHmNmSEMLNwrQ7xYr7alyjc46Buwzfeh\nFjfQRiuVCu5JatfNOkvcCiQLaDpNclN0Scsbdzu3XwKBgQD2K1bgtLGjFoe23Egm\njr0v70yn43IT/o9jty8tvJ7ChP/8YJNd70fiMAqz17aTGp1/dBdr5CwHHizI4BdQ\ntakk7rp99DLb2g2vMF4Q+RG21rZNs8w/Ork9FrLDsHC1d5YX+6TO2bl3jEhsYYTS\n1KZ5igvPIObWOuoyOQ8IQXGyjwKBgQDGE8vVFA2qKUfraub/cA3Q4b5ltEDzqTsS\nLvgQuxcLSU2vCkJpVnsdvTS52pSeaQgpGZKgARJf8kMfhVIsSD63UN+ojMv0tLgP\nkJLndZUBAqmmUiha0z+p/rV7RrGrRG6fE909WLcpE/XnlsU4uxhR8MuFeuTAbhvW\nef9uMWKafwKBgAixGw4wEx2ZDA2u1XVXEOMCZgh/hWWjVVjF/Qp2YHypyYgVuN5W\nNomL/LTA5xdmly0K4lDS66MMs7QcBXa6E1DUhQ0xdCJDHrySzp92y+NSzXkM4idR\nYX0AsisqrbAamtgZ8IXFNkE8WMpK3y+6hm5AK46SsNPbnK1NSnSWKveNAoGAGA4Z\naAQqcKrYwB9YdFcQZniz3bgZVz4LHXc0yxtdfhJl68cML6zAAOmUeKmx+Nb6lbs0\nUlgu+hX6zt4rD5OqgirBLsACmPJFlCZToOZntRq0ra02l2kmRyfWtGTueMUzxf/s\nk2GtxMBW0cw+oVgfaPwcS1aUZ0Y3/UENoz0+I1MCgYEA7EJSmXgriIs5bkgVCcN3\n7TMLf9eCRIa+McoF/ot9LL9sHQoY+2lqXhaRw5yvEty1k8lgUzcPigBz3eBCNwVk\nh7/ndLfl+NddakBqijIb/tnsX0tWks9QI+mC2+g3bGh+qzaB0W3gJtCfsfk51DQp\nhknq8VkX7cXeer6um4hCE7g=\n-----END PRIVATE KEY-----\n',
        client_email: '137901198154-compute@developer.gserviceaccount.com',
        client_id: '106519355712698903713',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://accounts.google.com/o/oauth2/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/137901198154-compute%40developer.gserviceaccount.com',
      },
    });
    return gcs.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME);
  } catch (error) {
    console.log('CLOUD STORAGE INIT ERROR', JSON.stringify(error)); // eslint-disable-line no-console
    return undefined;
  }
};

export default getCloudStorage;
