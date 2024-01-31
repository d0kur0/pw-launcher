import { For } from "solid-js";
import { useStore } from "@nanostores/solid";
import { CgSelectR } from "solid-icons/cg";
import { useNavigate } from "@solidjs/router";
import { $translations } from "../stores/language";
import { Anchor, Box, Button } from "@hope-ui/solid";
import { $gamePath, $gamePathActions } from "../stores/gamePath";
import { $characterActions, $characters } from "../stores/characters";
import { VsDebugStart } from "solid-icons/vs";
import { AiOutlineEdit } from "solid-icons/ai";
import { AiTwotoneDelete } from "solid-icons/ai";

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
									<img style={{ width: "38px" }} src={char.iconPath ? char.iconPath : plug} />
								</Box>

								<Box css={{ flex: "1 1 0" }}>
									<Box css={{ fontWeight: "500" }}>{char.name}</Box>
									<Box css={{ color: "$neutral9", lineHeight: 1.1 }}>{char.description || "-"}</Box>
								</Box>

								<Box css={{ display: "flex", gap: 6, alignItems: "center" }}>
									<Button
										css={{ px: 5 }}
										size="xs"
										onClick={() => $characterActions.start(id())}
										variant="outline"
										fullWidth={true}
										colorScheme="success"
									>
										<VsDebugStart style={{ width: "20px", height: "20px" }} />
									</Button>

									<Button
										css={{ px: 5 }}
										size="xs"
										onClick={() => navigate(`/edit/${id()}`)}
										variant="outline"
										fullWidth={true}
										colorScheme="primary"
									>
										<AiOutlineEdit style={{ width: "20px", height: "20px" }} />
									</Button>

									<Button
										css={{ px: 5 }}
										size="xs"
										variant="outline"
										onClick={() => $characterActions.remove(id())}
										fullWidth={true}
										colorScheme="danger"
									>
										<AiTwotoneDelete style={{ width: "20px", height: "20px" }} />
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
