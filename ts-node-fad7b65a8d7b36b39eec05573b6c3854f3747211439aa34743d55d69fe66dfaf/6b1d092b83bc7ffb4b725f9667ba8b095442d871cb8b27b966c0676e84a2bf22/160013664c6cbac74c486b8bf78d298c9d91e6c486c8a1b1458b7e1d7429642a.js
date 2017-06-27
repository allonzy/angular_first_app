"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const server_1 = require("../server");
exports.errorHandler = function (err, req, res, next) {
    let status = (err.httpCode) ? err.httpCode : 500;
    res.statusstatus;
    let errorPage = fs.existsSync(server_1.config.view.directory + '/error-pages/' + status + '.hbs') ? 'error-pages/' + status + '.hbs'
        : 'error-pages/default.hbs';
    if (req.accepts('html')) {
        res.render(errorPage, {
            status: status,
            error: err,
            url: req.url,
            contact: server_1.config.contact
        });
    }
    else if (req.accepts('json')) {
        res.send({
            status: status,
            error: err,
            contact: server_1.config.contact
        });
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvdXRpbHMvZXJyb3JIYW5kbGVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9zaW1vbnZpdmllci93b3Jrc3BhY2UvYXBwbGlfYW5ndWxhci9teV9maXJzdF9hbmd1bGFyX2FwcC91dGlscy9lcnJvckhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQWdDO0FBQ3JCLFFBQUEsWUFBWSxHQUFHLFVBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtJQUNyRCxJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBQyxHQUFHLENBQUMsUUFBUSxHQUFDLEdBQUcsQ0FBQztJQUM3QyxHQUFHLENBQUMsWUFBWSxDQUFBO0lBQ2hCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMsZUFBZSxHQUFDLE1BQU0sR0FBQyxNQUFNLENBQUMsR0FBQyxjQUFjLEdBQUMsTUFBTSxHQUFDLE1BQU07VUFDNUcseUJBQXlCLENBQUM7SUFDN0IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDckIsTUFBTSxFQUFDLE1BQU07WUFDYixLQUFLLEVBQUUsR0FBRztZQUNWLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRztZQUNaLE9BQU8sRUFBQyxlQUFNLENBQUMsT0FBTztTQUN0QixDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDUixNQUFNLEVBQUMsTUFBTTtZQUNiLEtBQUssRUFBQyxHQUFHO1lBQ1QsT0FBTyxFQUFDLGVBQU0sQ0FBQyxPQUFPO1NBQ3RCLENBQUMsQ0FBQztJQUNKLENBQUM7QUFDRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tICdmcy1leHRyYSc7XHRcbmltcG9ydCB7Y29uZmlnfSBmcm9tICcuLi9zZXJ2ZXInXG5leHBvcnQgbGV0IGVycm9ySGFuZGxlciA9IGZ1bmN0aW9uKGVyciwgcmVxLCByZXMsIG5leHQpe1xuXHRsZXQgc3RhdHVzID0gKGVyci5odHRwQ29kZSk/ZXJyLmh0dHBDb2RlOjUwMDtcblx0cmVzLnN0YXR1c3N0YXR1c1xuXHRsZXQgZXJyb3JQYWdlID0gZnMuZXhpc3RzU3luYyhjb25maWcudmlldy5kaXJlY3RvcnkrJy9lcnJvci1wYWdlcy8nK3N0YXR1cysnLmhicycpPydlcnJvci1wYWdlcy8nK3N0YXR1cysnLmhicydcblx0XHRcdDonZXJyb3ItcGFnZXMvZGVmYXVsdC5oYnMnO1xuXHRpZiAocmVxLmFjY2VwdHMoJ2h0bWwnKSkge1xuXHRcdHJlcy5yZW5kZXIoZXJyb3JQYWdlLCB7XG5cdFx0XHRzdGF0dXM6c3RhdHVzLFxuXHRcdFx0ZXJyb3I6IGVycixcblx0XHRcdHVybDogcmVxLnVybCxcblx0XHRcdGNvbnRhY3Q6Y29uZmlnLmNvbnRhY3Rcblx0XHR9KTtcblx0fVxuXHRlbHNlIGlmIChyZXEuYWNjZXB0cygnanNvbicpKSB7XG5cdFx0cmVzLnNlbmQoe1xuXHRcdFx0c3RhdHVzOnN0YXR1cyxcblx0XHRcdGVycm9yOmVycixcblx0XHRcdGNvbnRhY3Q6Y29uZmlnLmNvbnRhY3Rcblx0XHR9KTtcblx0fVxufTsiXX0=