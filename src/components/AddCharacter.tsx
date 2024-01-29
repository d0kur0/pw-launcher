import { Anchor, Box, Button, Input } from "@hope-ui/solid";
import { useStore } from "@nanostores/solid";
import { useNavigate } from "@solidjs/router";
import { $translations } from "../stores/language";
import { IoArrowBackSharp } from "solid-icons/io";
import { For } from "solid-js";
import { createStore } from "solid-js/store";
import { $characterActions } from "../stores/characters";

import ea from "../assets/ea.png";
import em from "../assets/em.png";
import ep from "../assets/ep.png";
import es from "../assets/es.png";
import mg from "../assets/mg.png";
import sb from "../assets/sb.png";
import sm from "../assets/sm.png";
import ta from "../assets/ta.png";
import tp from "../assets/tp.png";
import wb from "../assets/wb.png";
import wf from "../assets/wf.png";
import wr from "../assets/wr.png";

const icons = [ea, ep, wb, wf, mg, wr, em, es, sb, sm, ta, tp];

export function AddCharacter() {
	const navigate = useNavigate();
	const translations = useStore($translations);

	const [getFormValues, setFormValues] = createStore({
		name: "",
		iconPath: "",
		description: "",
		charName: "",
		charLogin: "",
		charPassword: "",
	});

	const handleCreate = (event: Event) => {
		event.preventDefault();
		$characterActions.create(getFormValues);
		navigate("/");
	};

	return (
		<form onSubmit={handleCreate}>
			<Box>
				<Anchor
					onClick={() => navigate("/")}
					css={{ display: "flex", alignItems: "center", gap: 5 }}
					color="$info10"
				>
					<IoArrowBackSharp />
					{translations().backToList}
				</Anchor>
			</Box>

			<Box css={{ mt: 24, display: "flex", flexDirection: "column", gap: 14 }}>
				<Input
					onInput={(v) => setFormValues((c) => ({ ...c, name: v.target.value }))}
					required
					placeholder={translations().charName.toString()}
				/>

				<Input
					onInput={(v) => setFormValues((c) => ({ ...c, description: v.target.value }))}
					placeholder={translations().charDescription.toString()}
				/>

				<Input
					onInput={(v) => setFormValues((c) => ({ ...c, charName: v.target.value }))}
					placeholder={translations().charRealName.toString()}
				/>

				<Input
					onInput={(v) => setFormValues((c) => ({ ...c, charLogin: v.target.value }))}
					required
					placeholder={translations().charLogin.toString()}
				/>

				<Input
					onInput={(v) => setFormValues((c) => ({ ...c, charPassword: v.target.value }))}
					required
					type="password"
					placeholder={translations().charPassword.toString()}
				/>
			</Box>

			<Box css={{ mt: 24 }}>
				<Box>{translations().charIconPath}</Box>

				<Box css={{ display: "flex", flexWrap: "wrap", gap: 5, mt: 14 }}>
					<For each={icons}>
						{(icon) => (
							<Box
								onClick={() => setFormValues((v) => ({ ...v, iconPath: icon }))}
								as="img"
								css={{
									width: "35px",
									cursor: "pointer",
									opacity: getFormValues.iconPath === icon ? 1 : "0.4",
								}}
								alt="-"
								src={icon}
							/>
						)}
					</For>
				</Box>
			</Box>

			<Button type="submit" colorScheme="accent" css={{ mt: 25 }}>
				{translations().create}
			</Button>
		</form>
	);
}
