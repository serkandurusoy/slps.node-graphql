import yup from 'yup';

yup.addMethod(yup.mixed, 'sameAs', function sameAs(ref, message) {
  return this.test('sameAs', message, function test(value) {
    const other = this.resolve(ref);
    return !other || !value || value === other;
  });
});
