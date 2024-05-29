import { Temporal as fcTemporal } from './js/lib/temporal-polyfill/index.js';

function Temporal_fun(date1, date2) {
	// date1 = convertDate(date1);
	// date2 = convertDate(date2);
	// let d1 = Temporal.PlainDate.from(date1).withCalendar('iso8601');
	// let d2 = Temporal.PlainDate.from(date2).withCalendar('iso8601');
	// return d1.until(d2, { largestUnit: 'year' });

	return Temporal.Calendar.from('iso8601').dateUntil(
		Temporal.PlainDate.from(date1),
		Temporal.PlainDate.from(date2),
		{ largestUnit: 'year' }
	);
}

function fcTemporal_fun(date1, date2) {
	return fcTemporal.Calendar.from('iso8601').dateUntil(
		fcTemporal.PlainDate.from(date1),
		fcTemporal.PlainDate.from(date2),
		{ largestUnit: 'year' }
	);
}

function calcAge() {
	if (form.checkValidity()) {

		let startDate = start_input.value;
		let endDate = end_input.value;
		// console.log(startDate);
		// console.log(endDate);


		const R1 = ymd(Temporal_fun(startDate, endDate));
		const r2 = ymd(fcTemporal_fun(startDate, endDate));
		// const r3 = "" /* ymd(luxon_fun(startDate, endDate)) */;
		const r3 = totalDays(endDate);
		const r4 =  "" /* ymd(ZitRos_fun(startDate, endDate)) */;


		// const isSame = checkSame(R1, r2) && checkSame(R1, r3) ? "✅" : checkSame(R1, r2) ? "☑" : "❌";
		const isSame = checkSame(R1, r2) ? "✅" : "❌";
		const isBDay = checkBDay(startDate, endDate);


		startDate = convertDateToString(startDate);
		endDate = convertDateToString(endDate);


		let content = writeToTable(startDate, endDate, R1, r2, r3, isSame, isBDay);
		table.insertAdjacentHTML("afterbegin", content);

	}
}

allInputs.forEach(input => input.addEventListener("input", calcAge));
