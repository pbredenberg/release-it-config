import { Plugin } from 'release-it';

export class PauseForChangelog extends Plugin {
   public async beforeRelease(): Promise<void> {
      const { infile } = this.options;

      // Set up our interactive prompt.
      this.registerPrompts({
         pause: {
            type: 'confirm',
            message: () => { return `Paused for ${infile} edits. Continue?`; },
         },
      });

      // Execute the prompt.
      await this.step(
         {
            enabled: true,
            label: 'Pause for changelog update.',
            prompt: 'pause',
         }
      );
   }
}

module.exports = PauseForChangelog;
