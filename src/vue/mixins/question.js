export default {
	props: {
		question: {
			type: Object,
			required: true
		}
	},
	computed: {
		choices() {
			if (!this.question.choices) {
				return;
			}
			return this.question.choices.map(function(x) {
				return typeof x === "string" ? { name: x, title: x } : { name: x.name, title: x.title || x.name }
			});
		}
	}
}