// Mobile menu toggle and contact form (static site: the form opens the visitor's email app).
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
  }

  var TO = 'team@american-code.com';
  var form = document.querySelector('.form');
  if (!form) return;
  var status = form.querySelector('.form-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = function (n) { return (form.elements[n].value || '').trim(); };
    var name = v('name'), email = v('email'), org = v('organization'), msg = v('message');
    var body = [
      'Name: ' + name,
      'Email: ' + email,
      org ? 'Organization: ' + org : '',
      '',
      msg
    ].filter(function (l, i) { return l !== '' || i === 3; }).join('\n');
    var href = 'mailto:' + TO +
      '?subject=' + encodeURIComponent('New contact form submission from ' + name) +
      '&body=' + encodeURIComponent(body);
    window.location.href = href;
    status.hidden = false;
    status.innerHTML = 'Your email app should open with your message ready to send. ' +
      'If it didn’t, email us at <a href="mailto:' + TO + '">' + TO + '</a>.';
  });
})();
