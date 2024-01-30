import { For } from "solid-js";
import { useStore } from "@nanostores/solid";
import { CgSelectR } from "solid-icons/cg";
import { useNavigate } from "@solidjs/router";
import { $translations } from "../stores/language";
import { Anchor, Box, Button } from "@hope-ui/solid";
import { $gamePath, $gamePathActions } from "../stores/gamePath";
import { $characterActions, $characters } from "../stores/characters";

import plug from "../assets/plug.webp";

export function Characters() {
	const gamePath = useStore($gamePath);
	const characters = useStore($characters);
	const translations = useStore($translations);

	const navigate = useNavigate();

	return (
		<Box>
			<Box
				css={{
					py: 8,
					mb: 16,
					px: 10,
					gap: 9,
					height: "40px",
					display: "flex",
					alignItems: "center",
					borderRadius: "6px",
					backgroundColor: "$neutral3",
				}}
			>
				<Box
					css={{
						flex: "1 1 0",
						color: "$neutral11",
						overflow: "hidden",
						whiteSpace: "nowrap",
						textOverflow: "ellipsis",
					}}
				>
					{gamePath() || translations().gamePathMock}
				</Box>

				<Box
					as="button"
					css={{
						gap: 6,
						color: "$accent11",
						border: "none",
						cursor: "pointer",
						display: "flex",
						alignItems: "center",
						backgroundColor: "transparent",
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
						color: "$neutral10",
						height: "calc(var(--viewport-height) - 86px)",
						border: "2px dashed",
						display: "flex",
						textAlign: "center",
						alignItems: "center",
						borderColor: "$neutral7",
						borderRadius: "8px",
						flexDirection: "column",
						justifyContent: "center",
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
				<Box css={{ mt: 24 }} class="grid">
					<For each={characters()}>
						{(char, id) => (
							<Box
								css={{
									p: 12,
									gap: 10,
									cursor: "pointer",
									display: "flex",
									flexWrap: "wrap",
									position: "relative",
									alignItems: "center",
									borderRadius: 8,
									backgroundColor: "$neutral2",
								}}
							>
								<Box>
									<img style={{ width: "50px" }} src={char.iconPath ? char.iconPath : plug} />
								</Box>

								<Box css={{ flex: "1 1 0", mr: 19 }}>
									<Box css={{ fontWeight: "bold" }}>{char.name}</Box>
									<Box css={{ color: "$neutral9" }}>{char.description || "-"}</Box>
								</Box>

								<Box css={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
									<Button
										size="xs"
										onClick={() => $characterActions.start(id())}
										variant="outline"
										fullWidth={true}
										colorScheme="success"
									>
										{translations().start}
									</Button>

									<Button
										size="xs"
										onClick={() => navigate(`/edit/${id()}`)}
										variant="outline"
										fullWidth={true}
										colorScheme="primary"
									>
										{translations().edit}
									</Button>

									<Button
										size="xs"
										variant="outline"
										onClick={() => $characterActions.remove(id())}
										fullWidth={true}
										colorScheme="danger"
									>
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
