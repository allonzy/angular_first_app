"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    title: { type: String, unique: true, required: true },
    text: { type: String }
});
exports.UserSchema.methods = {
    html: function () {
        return ("<h1>" + this.title.trim() + "</h1>" + +this.text.trim());
    }
};
exports.Todo = mongoose_1.model("Todo", exports.UserSchema);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvYXBwL2V4YW1wbGUvbW9kZWwvVG9kby50cyIsInNvdXJjZXMiOlsiL2hvbWUvc2ltb252aXZpZXIvd29ya3NwYWNlL2FwcGxpX2FuZ3VsYXIvbXlfZmlyc3RfYW5ndWxhcl9hcHAvYXBwL2V4YW1wbGUvbW9kZWwvVG9kby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5RDtBQVM5QyxRQUFBLFVBQVUsR0FBVyxJQUFJLGlCQUFNLENBQUM7SUFDekMsS0FBSyxFQUFHLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUcsSUFBSSxFQUFHLFFBQVEsRUFBRyxJQUFJLEVBQUM7SUFDdkQsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFHLE1BQU0sRUFBQztDQUN0QixDQUFDLENBQUM7QUFFSCxrQkFBVSxDQUFDLE9BQU8sR0FBRztJQUNqQixJQUFJLEVBQUc7UUFDSCxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxPQUFPLEdBQUUsQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDcEUsQ0FBQztDQUNKLENBQUM7QUFHVyxRQUFBLElBQUksR0FBc0IsZ0JBQUssQ0FBYSxNQUFNLEVBQUUsa0JBQVUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRG9jdW1lbnQsIFNjaGVtYSwgTW9kZWwsIG1vZGVsfSBmcm9tIFwibW9uZ29vc2VcIjtcbmltcG9ydCB7SVRvZG99IGZyb20gJy4vSVRvZG8nXG4gIFxuLy8tLS0tLS0tLS0tLS0tLS1kZXNjcmlwdGlvbiBvZiB0aGUgZmlsZVxuZXhwb3J0IGludGVyZmFjZSBJVG9kb01vZGVsIGV4dGVuZHMgRG9jdW1lbnQsSVRvZG8ge1xuICAvL2NhbiBiZSBleHRlbmRlZCBmb3IgaG9vaywgbWV0YUluZm8gLi4uXG59XG5cblxuZXhwb3J0IHZhciBVc2VyU2NoZW1hOiBTY2hlbWEgPSBuZXcgU2NoZW1hKHtcbiAgdGl0bGU6ICB7dHlwZTogU3RyaW5nLCB1bmlxdWUgOiB0cnVlICwgcmVxdWlyZWQgOiB0cnVlfSxcbiAgdGV4dDoge3R5cGUgOiBTdHJpbmd9XG59KTtcblxuVXNlclNjaGVtYS5tZXRob2RzID0ge1xuICAgIGh0bWwgOiBmdW5jdGlvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gKFwiPGgxPlwiK3RoaXMudGl0bGUudHJpbSgpICsgXCI8L2gxPlwiKyArIHRoaXMudGV4dC50cmltKCkpO1xuICAgIH1cbn07XG4vLyBjcmVhdGUgYSBSRVNUIGVuZHBvaW50IGZyb20gbWFuZ29vc2VcblxuZXhwb3J0IGNvbnN0IFRvZG86IE1vZGVsPElUb2RvTW9kZWw+ID0gbW9kZWw8SVRvZG9Nb2RlbD4oXCJUb2RvXCIsIFVzZXJTY2hlbWEpO1xuIl19