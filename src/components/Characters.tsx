import { Anchor, Box, Button } from "@hope-ui/solid";
import { useStore } from "@nanostores/solid";
import { $translations } from "../stores/language";
import { $gamePath, $gamePathActions } from "../stores/gamePath";
import { CgSelectR } from "solid-icons/cg";
import { useNavigate } from "@solidjs/router";
import { $characterActions, $characters } from "../stores/characters";
import { For } from "solid-js";

import plug from "../assets/plug.webp";

export function Characters() {
	const characters = useStore($characters);
	const gamePath = useStore($gamePath);
	const translations = useStore($translations);

	console.log(characters());

	const navigate = useNavigate();

	return (
		<Box>
			<Box
				css={{
					height: "40px",
					display: "flex",
					alignItems: "center",
					gap: 9,
					mb: 16,
					backgroundColor: "$neutral3",
					px: 10,
					py: 8,
					borderRadius: "6px",
				}}
			>
				<Box
					css={{
						flex: "1 1 0",
						whiteSpace: "nowrap",
						textOverflow: "ellipsis",
						overflow: "hidden",
						color: "$neutral11",
					}}
				>
					{gamePath() || translations().gamePathMock}
				</Box>

				<Box
					as="button"
					css={{
						border: "none",
						cursor: "pointer",
						backgroundColor: "transparent",
						color: "$accent11",
						display: "flex",
						gap: 6,
						alignItems: "center",
					}}
					onClick={$gamePathActions.selectGamePath}
				>
					<CgSelectR /> <Box style={{ "margin-bottom": "2px" }}>{translations().selectElementClient}</Box>
				</Box>
			</Box>

			{!!characters().length || (
				<Box
					css={{
						p: 40,
						border: "2px dashed",
						borderColor: "$neutral7",
						borderRadius: "8px",
						textAlign: "center",
						color: "$neutral10",
						height: "calc(var(--viewport-height) - 86px)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
					}}
				>
					<Box>{translations().emptyMessage}</Box>
					<Box>
						<Anchor onClick={() => navigate("/add-char")} color="$accent10">
							{translations().addCharacter}
						</Anchor>
					</Box>
				</Box>
			)}

			{!!characters().length && (
				<Box css={{ mt: 24, display: "flex", flexDirection: "column", gap: 19 }}>
					<For each={characters()}>
						{(char, id) => (
							<Box
								css={{
									p: 16,
									display: "flex",
									gap: 10,
									alignItems: "center",
									borderRadius: 8,
									backgroundColor: "$neutral2",
								}}
							>
								<Box>
									<img style={{ width: "50px" }} src={char.iconPath ? char.iconPath : plug} />
								</Box>
								<Box css={{ flex: "1 1 0" }}>
									<Box css={{ fontWeight: "bold" }}>{char.name}</Box>
									<Box css={{ color: "$neutral9" }}>{char.description || "-"}</Box>
								</Box>
								<Box css={{ display: "flex", gap: 7 }}>
									<Button onClick={() => $characterActions.start(id())} size="sm" colorScheme="warning">
										{translations().start}
									</Button>

									<Button size="sm" onClick={() => $characterActions.remove(id())} colorScheme="danger">
										{translations().remove}
									</Button>
								</Box>
							</Box>
						)}
					</For>
				</Box>
			)}
		</Box>
	);
}
