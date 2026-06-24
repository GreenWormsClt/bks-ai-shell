import type { AvailableProviders, ModelInfo } from "@/config";
import { providerConfigs } from "@/config";
import { BaseProvider } from "@/providers/BaseProvider";
import { createZhipu } from "zhipu-ai-provider";

const ZAI_GENERAL_BASE_URL = "https://api.z.ai/api/paas/v4";

type ZaiModelConfig = (typeof providerConfigs.zai.models)[number] & {
  apiModelId?: string;
  apiBaseURL?: string;
};

export class ZaiProvider extends BaseProvider {
  constructor(private options: { apiKey: string }) {
    super();
  }

  get providerId(): AvailableProviders {
    return "zai";
  }

  getModel(id: string) {
    const config = providerConfigs.zai.models.find(
      (m) => m.id === id,
    ) as ZaiModelConfig | undefined;

    return createZhipu({
      baseURL: config?.apiBaseURL ?? ZAI_GENERAL_BASE_URL,
      apiKey: this.options.apiKey,
    }).languageModel(config?.apiModelId ?? id);
  }

  async listModels(): Promise<ModelInfo[]> {
    // @ts-expect-error
    return providerConfigs.zai.models;
  }
}
