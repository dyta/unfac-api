const express = require("express");
const app = express();

const cs = require("./../controllers/console");
const ln = require("./../controllers/app");

app.use("/", cs.AccountRouter);
app.use("/v2/enterprise", cs.EnterpriseRouter);
app.use("/v2/invite", cs.InviteRouter);
app.use("/v2/work", cs.WorkRouter);
app.use("/v2/employee", cs.EmployeeRouter);
app.use("/v2/request", cs.RequestRouter);
app.use("/v2/etp-setting", cs.EnterpriseSettingRouter);
app.use("/v2/manufacture", cs.ManufactureRouter);

app.use("/app/employee", ln.EmployeeRouter);
app.use("/app/enterprise", ln.EnterpriseRouter);
app.use("/app/work", ln.WorkRouter);
app.use("/app/request", ln.RequestRouter);
app.use("/app/manufacture", ln.ManufactureRouter);

module.exports = app;