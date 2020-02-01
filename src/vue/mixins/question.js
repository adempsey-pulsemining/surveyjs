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
				return typeof x === "object" ? { name: x.name, title: x.title || x.name } : { name: x, title: x };
			});
		}
	}
}