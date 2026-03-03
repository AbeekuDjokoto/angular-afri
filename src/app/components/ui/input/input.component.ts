import {
  Component,
  input,
  output,
  signal,
  computed,
  inject,
  Optional,
  Self,
  AfterViewInit,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

/**
 * Reusable input component matching Afri Transfer Figma (node 176-11993).
 * - Label (Gray/600, 14px)
 * - Border Gray/300, 8px radius
 * - Placeholder Gray/400, optional leading/trailing content
 */
@Component({
  selector: 'afri-input',
  standalone: true,
  host: {
    class: 'block w-full',
    '[class.afri-input--error]': 'error()',
    '[class.afri-input--disabled]': 'disabledState()',
  },
  template: `
    <div class="flex flex-col gap-1.5 w-full">
      @if (label()) {
        <label [for]="inputId()" class="afri-input__label">
          {{ label() }}
          @if (required()) {
            <span class="text-error-500" aria-hidden="true">*</span>
          }
        </label>
      }
      <div class="afri-input__wrapper">
        @if (hasPrefix()) {
          <span class="afri-input__prefix">
            <ng-content select="[prefix]" />
          </span>
        }
        <input
          [id]="inputId()"
          [type]="type()"
          [placeholder]="placeholder()"
          [disabled]="disabledState()"
          [readonly]="readonly()"
          [attr.aria-invalid]="error()"
          [attr.aria-describedby]="hintId()"
          [attr.autocomplete]="autocomplete()"
          (input)="onInput($event)"
          (blur)="handleBlur($event)"
          (focus)="focus.emit($event)"
          [class]="classes()"
          #inputEl
        />
        @if (hasSuffix()) {
          <span class="afri-input__suffix">
            <ng-content select="[suffix]" />
          </span>
        }
      </div>
      @if (error() && errorMessage()) {
        <span [id]="hintId()" class="afri-input__hint afri-input__hint--error" role="alert">
          {{ errorMessage() }}
        </span>
      }
      @if (!error() && hint()) {
        <span [id]="hintId()" class="afri-input__hint">
          {{ hint() }}
        </span>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .afri-input__label {
      font-family: var(--font-family-figtree), var(--font-family-poppins), sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.2;
      color: var(--color-gray-600);
    }

    .afri-input__wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 44px;
      padding: 0 12px;
      border: 1px solid var(--color-gray-300);
      border-radius: 8px;
      background-color: var(--color-white);
      transition:
        border-color 0.15s,
        box-shadow 0.15s;
    }

    .afri-input__wrapper:focus-within {
      border-color: var(--color-primary-500);
      outline: none;
      box-shadow: 0 0 0 2px rgba(51, 129, 204, 0.2);
    }

    .afri-input--error .afri-input__wrapper {
      border-color: var(--color-error-500);
    }

    .afri-input--error .afri-input__wrapper:focus-within {
      border-color: var(--color-error-500);
      box-shadow: 0 0 0 2px rgba(244, 68, 56, 0.2);
    }

    .afri-input--disabled .afri-input__wrapper {
      background-color: var(--color-gray-50);
      border-color: var(--color-gray-200);
      cursor: not-allowed;
      opacity: 0.8;
    }

    .afri-input__field {
      flex: 1;
      min-width: 0;
      height: 42px;
      padding: 0;
      border: none;
      background: none;
      font-family: var(--font-family-figtree), var(--font-family-poppins), sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: var(--color-gray-900);
    }

    .afri-input__field::placeholder {
      color: var(--color-gray-400);
    }

    .afri-input__field:focus {
      outline: none;
    }

    .afri-input__field:disabled {
      cursor: not-allowed;
    }

    .afri-input__prefix,
    .afri-input__suffix {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--color-gray-400);
      flex-shrink: 0;
    }

    .afri-input__prefix :deep(svg),
    .afri-input__suffix :deep(svg) {
      width: 20px;
      height: 20px;
    }

    .afri-input__hint {
      font-family: var(--font-family-figtree), var(--font-family-poppins), sans-serif;
      font-size: 12px;
      line-height: 1.33;
      color: var(--color-gray-500);
    }

    .afri-input__hint--error {
      color: var(--color-error-600);
    }
  `,
})
export class AfriInputComponent implements ControlValueAccessor, AfterViewInit {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private uniqueId = `afri-input-${Math.random().toString(36).slice(2, 9)}`;

  label = input<string>('');
  placeholder = input<string>('');
  type = input<'text' | 'email' | 'password'>('text');
  hint = input<string>('');
  classes = input<string>('afri-input__field');
  errorMessage = input<string>('');
  required = input<boolean>(false);
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  autocomplete = input<string | undefined>(undefined);

  blur = output<FocusEvent>();
  focus = output<FocusEvent>();

  error = computed(() => !!this.errorMessage());
  private formDisabled = signal(false);
  disabledState = computed(() => this.disabled() || this.formDisabled());
  inputId = signal(this.uniqueId);
  hintId = signal(`${this.uniqueId}-hint`);

  private hasPrefixSlot = signal(false);
  private hasSuffixSlot = signal(false);
  hasPrefix = () => this.hasPrefixSlot();
  hasSuffix = () => this.hasSuffixSlot();

  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;
    this.hasPrefixSlot.set(!!host.querySelector('[prefix]'));
    this.hasSuffixSlot.set(!!host.querySelector('[suffix]'));
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  protected handleBlur(event: FocusEvent): void {
    this.onTouched();
    this.blur.emit(event);
  }

  writeValue(value: string | null): void {
    const input = this.el.nativeElement.querySelector('input');
    if (input) {
      input.value = value ?? '';
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}
